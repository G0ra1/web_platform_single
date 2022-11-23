import {
    icon1,
    icon2
} from '../../iconFontURL.js'
export default (title, main) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/assets/image/clogo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
    </head>
    <body style="padding: 0 !important; margin: 0 !important;">
        <div id="app" style="height: 100vh">
            <div style="display:flex;height:100%;justify-content: center;align-items: center;" >
                <img src="/assets/image/loading.gif" />
            </div>
        </div>
        <script type="module" src="${icon1}"></script>
        <script type="module" src="${icon2}"></script>
        <script type="module" src="${main}"></script>
    </body>
    </html>
`