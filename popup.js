document.addEventListener('DOMContentLoaded', function() {
  let copyButton = document.getElementById('copyButton')

  copyButton.addEventListener('click', function() {
    chrome.tabs.query({currentWindow: true}, async function(tabs) {
      let urls = tabs.map(t => t.url)

      const strippedURLs = urls.map(url => stripURLParams(url))

      const numElementsCopiedTextElement = document.getElementById('numURLs')

      copyURLs(strippedURLs)
      // show how many urls are copied in the popup
      .then(function() {
    
        numElementsCopiedTextElement.innerText = `${urls.length} URLs copied`
      })
      
      // reset the popup to not show how many urls copied
      .then(() => {
        setTimeout(() => {
          numElementsCopiedTextElement.innerText = '...'
        }, [3000])
      })
    })
  })
})

async function copyURLs(urls) {
  navigator.clipboard.writeText(urls.join('\n'))
}


function stripURLParams(url) {

  const urlObj = new URL(url)

  urlObj.search = ''

  return urlObj.toString()
}
