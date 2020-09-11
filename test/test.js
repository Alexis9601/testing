"use strict";

let assert = require('assert');
var webdriver = require('selenium-webdriver');
const { Key } = require("selenium-webdriver");
var browser = new webdriver.Builder().usingServer().withCapabilities({ 'browserName': 'firefox' }).build();

const getUrl = () => {
    return new Promise((resolve, reject) => {
        resolve(
            browser.get('https://alexis9601.github.io/'))
    })
}

const search = (t) => {
    return new Promise((resolve, reject) => {
        resolve(browser.findElement(webdriver.By.xpath('//*[@id="searchText"]')).sendKeys(t, Key.RETURN));
    })
}

const find = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(browser.findElement(webdriver.By.xpath('//*[@id="tt0099785"]')).click())
        }, 6000);
    })
}

const getTitle = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(browser.findElement(webdriver.By.xpath('//*[@id="tt0099785"]')).getText())
        }, 9000);
    })
}

const getError = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(browser.findElement(webdriver.By.xpath('//*[@id="Error"]')).getText())
        }, 4000);
    })
}

const close = () => {
    return new Promise((resolve, reject) => {
        resolve(browser.quit())
    })
}

function busqueda() {
    return new Promise((resolve, reject) => {
        getUrl().then(() => {
            search("Home").then(() => {
                find().then(() => {
                    getTitle().then((result) => {
                        resolve(result);
                    })
                })
            })
        })
    })
}

function busquedaNoExiste() {
    return new Promise((resolve, reject) => {
        getUrl().then(() => {
            search("Home Alone 5").then(() => {
                getError().then((result) => {
                    close()
                    resolve(result.substring(0, 27))
                })
            })
        })
    })
}
describe('Busqueda de una pelicula existente', function() {
    it('Se realiza la busqueda de Home y se selecciona la pelicula Home Alone', async function() {
        await busqueda().then((result) => {
            assert.equal(result, "Home Alone")
        })

    })
});
describe('Busqueda de una pelicula que no existe', function() {
    it('Se realiza la busqueda de Home Alones y se muestra un error', async function() {
        await busquedaNoExiste().then((result) => {
            assert.equal(result, "No se encontraron peliculas")
        })

    })
});