export interface SongData {
  id: number
  name: string
  artistString: string
  songType: string
  mainPicture: {
    urlThumb: string
  }
}

export interface PV {
  pvType: string
  service: string
  pvId: string
}

export interface Lyric {
  translationType: string
}

export interface SelectedSong {
  song: SongData
  pvs: PV[]
  lyricsFromParents: Lyric[]
  artists: {
    categories: string[]
    roles: string[]
    name: string
  }[]
}
