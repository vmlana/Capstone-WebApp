const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    mobileP: '568px',
    tablet: '768px',
    laptop: '1024px',
    desktopM: '1220px',
    desktopL: '1500px'
}

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    mobileP: `(min-width: ${size.mobileP})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    desktopM: `(min-width: ${size.desktopL})`,
    desktopL: `(min-width: ${size.desktopL})`
};