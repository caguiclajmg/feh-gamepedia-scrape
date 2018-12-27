const fs = require('fs'),
    rp = require('request-promise'),
    cheerio = require('cheerio');

rp('https://feheroes.gamepedia.com/Weapons').then(page => {
    const $ = cheerio.load(page),
        tableBody = $('td.field_Weapon').parent().parent(),
        weapons = [];

    tableBody.find('tr').each((index, element) => {
        element = $(element);

        element.find('td.field_Description').find('br').replaceWith('\n');

        const weapon = {
            id: index,
            name: element.find('td.field_Weapon > a').text(),
            description: element.find('td.field_Description').text(),
            might: parseInt(element.find('td.field_Might').text()),
            range: parseInt(element.find('td.field_Range').text()),
            sp: parseInt(element.children('td.field_SP').text()),
        };

        if(/\S/.test(weapon.name)) weapons.push(weapon);
    });

    fs.writeFile('weapons.json', JSON.stringify(weapons, null, 2), 'utf8', err => {
        if(err) console.err(err);
    });
});

rp('https://feheroes.gamepedia.com/Assists').then(page => {
    const $ = cheerio.load(page),
        tableBody = $('td.field_Name').parent().parent(),
        assists = [];

    tableBody.find('tr').each((index, element) => {
        element = $(element);

        element.find('td.field_Description').find('br').replaceWith('\n');

        const assist = {
            id: index,
            name: element.find('td.field_Name > a').text(),
            description: element.find('td.field_Description').text(),
            range: parseInt(element.find('td.field_Range').text()),
            sp: parseInt(element.children('td.field_SP').text()),
        };

        if(/\S/.test(assist.name)) assists.push(assist);
    });

    fs.writeFile('assists.json', JSON.stringify(assists, null, 2), 'utf8', err => {
        if(err) console.err(err);
    });
});
