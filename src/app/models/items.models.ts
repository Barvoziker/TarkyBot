export class items {
    constructor(
        public id: string,
        public name: string,
        public shortName: string,
        public description: string,
        public image: string,
        public wikiLink: string,
        public wikiImage: string,
        public wikiImageLarge: string,
        public type: string,
        public rarity: string,
        public basePrice: number,
        public traderPrice: number,
        public traderName: string,
        public traderPriceCur: string,
        public updated: string,
        public slots: number,
        public weight: number,
    ){}
}