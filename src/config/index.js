import championList from 'lol-champions';
import { keyBy } from 'lodash';
export const EFFICIENT_CHAMP_LIST = keyBy(championList, 'key');
export const LEAGUE_SERVER = "http://localhost:5000/";