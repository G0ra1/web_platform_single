export default (title: string, main: string, base: string) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/clogo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
    </head>
    <body style="padding: 0 !important; margin: 0 !important;overflow: hidden">
        <div id="app" style="height: 100vh">
            <div style="display:flex;height:100%;justify-content: center;align-items: center;" >
                <img src="/../web-main/loading.svg" />
            </div>
        </div>
        <script type="module" src="//at.alicdn.com/t/c/font_3535585_7umesbgskc6.js"></script>
        <script type="module" src="${main}"></script>
    </body>
    </html>
`