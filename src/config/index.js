import championList from 'lol-champions';
import spellList from 'lol-spells';
// import itemList from 'lol-items/items';
import { keyBy, map } from 'lodash';
import runeList from '../json/runesReforged.json';
import itemList from '../json/item.json';


export const EFFICIENT_CHAMP_LIST = keyBy(championList, 'key');
export const EFFICIENT_ITEM_LIST = keyBy(map(itemList.data, (value,key)=>{
    return {
        name: value.name,
        id: key
    }
}),'id');
export const EFFICIENT_RUNE_LIST = keyBy(map(runeList, (value,key)=>{
    return {
        name: value.name,
        id: value.id
    }
}),'id');
export const EFFICIENT_SPELL_LIST = keyBy(spellList, 'key');
export const LEAGUE_SERVER = "http://localhost:5000/";
// export const LEAGUE_SERVER = "https://ladoli-league-server.herokuapp.com/";
