const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const sharp = require('sharp')

const outputJson = path.join(__dirname, 'renderer', 'src', 'data', 'characters.json')
const outputImg = path.join(__dirname, 'renderer', 'src', 'assets', 'characters')

// Create folders if needed
fs.mkdirSync(path.dirname(outputJson), { recursive: true })
fs.mkdirSync(outputImg, { recursive: true })

// Load existing JSON (optional, if you want to preserve old entries)
let existing = []
if (fs.existsSync(outputJson)) {
  existing = JSON.parse(fs.readFileSync(outputJson, 'utf-8'))
}
const characterMap = new Map(existing.map(char => [char.name, char]))

async function convertToWebP(pngPath, outputDir) {
  const webpName = path.basename(pngPath, '.png') + '.webp'
  const webpPath = path.join(outputDir, webpName)

  await sharp(pngPath)
    .toFormat('webp')
    .toFile(webpPath)

  fs.unlinkSync(pngPath)
  return webpName
}

async function scrapeCharacters() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://gametora.com/umamusume/characters', {
    waitUntil: 'networkidle2',
  })

  const characters = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('a.sc-73e3e686-1.iAslZY'))

    return cards.map(card => {
      const container = card.querySelector('div')
      const divs = container?.children || []

      const img = divs[0]?.querySelector('img')?.src || ''
      const imageFile = img.split('/').pop()

      const variantSpan = divs[1]?.querySelector('span')
      const variant = variantSpan ? variantSpan.innerText.trim() : 'Default'

      const name = divs[2]?.innerText.trim() || 'Unknown'

      return {
        name,
        variant,
        imageFile,
        imageUrl: img.startsWith('/') ? `https://gametora.com${img}` : img
      }
    })
  })

  await browser.close()

  let added = 0

  for (const char of characters) {
    const existingChar = characterMap.get(char.name) || { name: char.name, variants: [] }

    const alreadyExists = existingChar.variants.some(v => v.image === char.imageFile.replace('.png', '.webp'))
    if (!alreadyExists) {
      const localPngPath = path.join(outputImg, char.imageFile)
      const webpName = char.imageFile.replace('.png', '.webp')
      const localWebpPath = path.join(outputImg, webpName)

      if (!fs.existsSync(localWebpPath)) {
        try {
          const res = await axios.get(char.imageUrl, { responseType: 'arraybuffer' })
          fs.writeFileSync(localPngPath, res.data)
          await convertToWebP(localPngPath, outputImg)
          console.log(`⬇️ Downloaded and converted: ${webpName}`)
        } catch (err) {
          console.warn(`⚠️ Failed to download ${char.imageUrl}: ${err.message}`)
          continue
        }
      }

      existingChar.variants.push({
        label: char.variant,
        image: webpName,
      })

      characterMap.set(char.name, existingChar)
      added++
    }
  }

  const finalList = Array.from(characterMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  fs.writeFileSync(outputJson, JSON.stringify(finalList, null, 2), 'utf-8')

  console.log(`✅ Scrape complete. ${added} new variant(s) added.`)
  console.log(`📁 Data saved to: ${outputJson}`)
}

module.exports = scrapeCharacters