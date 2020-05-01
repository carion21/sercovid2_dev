class Config {
    static  removeExtraSpace(str)
    {
        str = str.replace(/[\s]{1,}/g,""); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
        return str;    
    }
}

module.exports = Config