document.addEventListener('DOMContentLoaded', function() {
  let copyButton = document.getElementById('copyButton')

  copyButton.addEventListener('click', function() {
    chrome.tabs.query({}, async function(tabs) {
      let urls = tabs.map(t => t.url)

      const strippedURLs = urls.map(url => stripURLParams(url))
      copyURLs(strippedURLs)
    })
  })
})

function copyURLs(urls) {
  navigator.clipboard.writeText(urls.join('\n')).then(function() {
    const numElementsCopiedTextElement = document.getElementById('numURLs')

    numElementsCopiedTextElement.innerText = `${urls.length} URLs copied`
  })
}


function stripURLParams(url) {

  const urlObj = new URL(url)

  urlObj.search = ''

  return urlObj.toString()
}
