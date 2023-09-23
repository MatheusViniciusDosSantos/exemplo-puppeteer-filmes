const { info } = require('console');
const puppeteer = require('puppeteer');

async function pegarMouse() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // let nomeFilme = "Marvel Vingadores ultimato";
    let nomeFilme = "Interestelar";

    let nomeFilmeFormatado = nomeFilme.replaceAll(" ", "+");

    let link = `https://www.google.com/search?q=${nomeFilmeFormatado}`;

    console.log(link);

    await page.goto(link);

    const informacoesFilme = await page.evaluate(() => {
        let nomeFilme = document.querySelector(".MDY31c .QpPSMb .DoxwDb .PZPZlf").innerHTML;
        let faixaEtaria = document.querySelector(".MDY31c .nwVKo .loJjTe .iAIpCb .zqhAOd").innerHTML;
        let informacoes = document.querySelector(".MDY31c .nwVKo .loJjTe .iAIpCb > span:nth-of-type(2)").innerHTML;
        informacoes = informacoes.split(" ‧ ");
        return {
            "nomeFilme": nomeFilme,
            "faixaEtaria": faixaEtaria,
            "anoLancamento": informacoes[0],
            "genero": informacoes[1],
            "tempoDuracao": informacoes[2]
        };
    })

    console.log(informacoesFilme);
    browser.close();
}

pegarMouse();