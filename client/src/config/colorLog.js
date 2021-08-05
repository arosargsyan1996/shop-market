class ColorLog {
    constructor() {
        this.styles = `
            border-width: 2px;
            border-left-width: 8px;
            border-style: solid;
            border-right: none;
            font-size: 16px;
            font-weight: 700;
            padding: 5px;
            margin: 5px;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        `;
    }

    green = ( t ) => {
        const styles = `
            ${ this.styles }
            background: #3EFF95;
            color: #020419;
            border-color: #42176bdb;
        `;

        return [ `%c${ t }`, styles ];
    };
    red = ( t ) => {
        const styles = `
            ${ this.styles }
            background: red;
            color: pink;
            border-color: pink;
        `;

        return [ `%c${ t }`, styles ];
    };
}

window.color = new ColorLog();