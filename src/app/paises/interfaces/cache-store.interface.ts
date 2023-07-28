import { Pais } from "./pais.interface";
import { Region } from "./region.type";

export interface CacheStore{
    byCapital : TermPais;
    byPais : TermPais;
    byRegion : RegionPais;
}

interface TermPais{
    term: string;
    paises: Pais[]
}

interface RegionPais{
    region?: Region;
    paises: Pais[]
}