// Mock Data Service for FutHub
// This replaces all backend API calls with dummy data

// Mock Users
export const mockUsers = {
    1: {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        profile_img: 'https://i.pravatar.cc/150?img=12',
        friends: [
            { id: 2, name: 'Jane Smith', username: 'janesmith', profile_img: 'https://i.pravatar.cc/150?img=5' },
            { id: 3, name: 'Mike Johnson', username: 'mikej', profile_img: 'https://i.pravatar.cc/150?img=33' },
            { id: 4, name: 'Sarah Williams', username: 'sarahw', profile_img: 'https://i.pravatar.cc/150?img=9' },
            { id: 5, name: 'Tom Brown', username: 'tombrown', profile_img: 'https://i.pravatar.cc/150?img=15' },
        ],
        user_leagues: [
            {
                id: 1,
                league: {
                    id: 39,
                    name: 'Premier League',
                    type: 'League',
                    logo: 'https://media.api-sports.io/football/leagues/39.png',
                    country: 'England',
                    flag: 'https://media.api-sports.io/flags/gb.svg',
                },
            },
            {
                id: 2,
                league: {
                    id: 140,
                    name: 'La Liga',
                    type: 'League',
                    logo: 'https://media.api-sports.io/football/leagues/140.png',
                    country: 'Spain',
                    flag: 'https://media.api-sports.io/flags/es.svg',
                },
            },
            {
                id: 3,
                league: {
                    id: 61,
                    name: 'Ligue 1',
                    type: 'League',
                    logo: 'https://media.api-sports.io/football/leagues/61.png',
                    country: 'France',
                    flag: 'https://media.api-sports.io/flags/fr.svg',
                },
            },
        ],
        watchparties: [
            {
                id: 1,
                location: 'Sports Bar Downtown',
                date: '2026-02-08',
                time: '15:00',
                match_id: 1,
                home_team: 'Manchester United',
                away_team: 'Liverpool',
                attendees: ['Jane Smith', 'Mike Johnson'],
            },
            {
                id: 2,
                location: 'The Pub on Main St',
                date: '2026-02-10',
                time: '20:00',
                match_id: 2,
                home_team: 'Real Madrid',
                away_team: 'Barcelona',
                attendees: ['Sarah Williams', 'Tom Brown'],
            },
        ],
        invitations: [
            {
                id: 1,
                watchparty_id: 3,
                from_user: 'Jane Smith',
                location: 'Riverside Tavern',
                date: '2026-02-12',
                time: '18:30',
                home_team: 'Chelsea',
                away_team: 'Arsenal',
            },
        ],
    },
    guest123: {
        id: 999,
        name: 'Guest User',
        username: 'guest123',
        profile_img: 'https://i.pravatar.cc/150?img=68',
        friends: [
            { id: 2, name: 'Jane Smith', username: 'janesmith', profile_img: 'https://i.pravatar.cc/150?img=5' },
        ],
        user_leagues: [
            {
                id: 1,
                league: {
                    id: 39,
                    name: 'Premier League',
                    type: 'League',
                    logo: 'https://media.api-sports.io/football/leagues/39.png',
                    country: 'England',
                    flag: 'https://media.api-sports.io/flags/gb.svg',
                },
            },
        ],
        watchparties: [],
        invitations: [],
    },
}

// Mock Popular Leagues
export const mockPopularLeagues = [
    {
        id: 39,
        name: 'Premier League',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/39.png',
        country: 'England',
        flag: 'https://media.api-sports.io/flags/gb.svg',
    },
    {
        id: 140,
        name: 'La Liga',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/140.png',
        country: 'Spain',
        flag: 'https://media.api-sports.io/flags/es.svg',
    },
    {
        id: 135,
        name: 'Serie A',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/135.png',
        country: 'Italy',
        flag: 'https://media.api-sports.io/flags/it.svg',
    },
    {
        id: 78,
        name: 'Bundesliga',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/78.png',
        country: 'Germany',
        flag: 'https://media.api-sports.io/flags/de.svg',
    },
    {
        id: 61,
        name: 'Ligue 1',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/61.png',
        country: 'France',
        flag: 'https://media.api-sports.io/flags/fr.svg',
    },
    {
        id: 2,
        name: 'UEFA Champions League',
        type: 'Cup',
        logo: 'https://media.api-sports.io/football/leagues/2.png',
        country: 'World',
        flag: null,
    },
    {
        id: 3,
        name: 'UEFA Europa League',
        type: 'Cup',
        logo: 'https://media.api-sports.io/football/leagues/3.png',
        country: 'World',
        flag: null,
    },
    {
        id: 94,
        name: 'Primeira Liga',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/94.png',
        country: 'Portugal',
        flag: 'https://media.api-sports.io/flags/pt.svg',
    },
    {
        id: 88,
        name: 'Eredivisie',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/88.png',
        country: 'Netherlands',
        flag: 'https://media.api-sports.io/flags/nl.svg',
    },
    {
        id: 203,
        name: 'Süper Lig',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/203.png',
        country: 'Turkey',
        flag: 'https://media.api-sports.io/flags/tr.svg',
    },
    {
        id: 253,
        name: 'Major League Soccer',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/253.png',
        country: 'USA',
        flag: 'https://media.api-sports.io/flags/us.svg',
    },
    {
        id: 71,
        name: 'Serie A',
        type: 'League',
        logo: 'https://media.api-sports.io/football/leagues/71.png',
        country: 'Brazil',
        flag: 'https://media.api-sports.io/flags/br.svg',
    },
]

// Mock Matches - Generate matches for different dates
export const generateMockMatches = (dateString) => {
    const baseMatches = [
        {
            fixture: {
                id: 1,
                referee: 'Michael Oliver',
                timezone: 'UTC',
                date: `${dateString}T15:00:00+00:00`,
                timestamp: new Date(`${dateString}T15:00:00`).getTime() / 1000,
                periods: { first: null, second: null },
                venue: { id: 1, name: 'Old Trafford', city: 'Manchester' },
                status: { long: 'Not Started', short: 'NS', elapsed: null },
            },
            league: {
                id: 39,
                name: 'Premier League',
                country: 'England',
                logo: 'https://media.api-sports.io/football/leagues/39.png',
                flag: 'https://media.api-sports.io/flags/gb.svg',
                season: 2025,
                round: 'Regular Season - 25',
            },
            teams: {
                home: {
                    id: 33,
                    name: 'Manchester United',
                    logo: 'https://media.api-sports.io/football/teams/33.png',
                    winner: null,
                },
                away: {
                    id: 40,
                    name: 'Liverpool',
                    logo: 'https://media.api-sports.io/football/teams/40.png',
                    winner: null,
                },
            },
            goals: { home: null, away: null },
            score: {
                halftime: { home: null, away: null },
                fulltime: { home: null, away: null },
                extratime: { home: null, away: null },
                penalty: { home: null, away: null },
            },
        },
        {
            fixture: {
                id: 2,
                referee: 'Anthony Taylor',
                timezone: 'UTC',
                date: `${dateString}T17:30:00+00:00`,
                timestamp: new Date(`${dateString}T17:30:00`).getTime() / 1000,
                periods: { first: null, second: null },
                venue: { id: 2, name: 'Stamford Bridge', city: 'London' },
                status: { long: 'Not Started', short: 'NS', elapsed: null },
            },
            league: {
                id: 39,
                name: 'Premier League',
                country: 'England',
                logo: 'https://media.api-sports.io/football/leagues/39.png',
                flag: 'https://media.api-sports.io/flags/gb.svg',
                season: 2025,
                round: 'Regular Season - 25',
            },
            teams: {
                home: {
                    id: 49,
                    name: 'Chelsea',
                    logo: 'https://media.api-sports.io/football/teams/49.png',
                    winner: null,
                },
                away: {
                    id: 42,
                    name: 'Arsenal',
                    logo: 'https://media.api-sports.io/football/teams/42.png',
                    winner: null,
                },
            },
            goals: { home: null, away: null },
            score: {
                halftime: { home: null, away: null },
                fulltime: { home: null, away: null },
                extratime: { home: null, away: null },
                penalty: { home: null, away: null },
            },
        },
        {
            fixture: {
                id: 3,
                referee: 'Mateu Lahoz',
                timezone: 'UTC',
                date: `${dateString}T20:00:00+00:00`,
                timestamp: new Date(`${dateString}T20:00:00`).getTime() / 1000,
                periods: { first: null, second: null },
                venue: { id: 3, name: 'Santiago Bernabéu', city: 'Madrid' },
                status: { long: 'Not Started', short: 'NS', elapsed: null },
            },
            league: {
                id: 140,
                name: 'La Liga',
                country: 'Spain',
                logo: 'https://media.api-sports.io/football/leagues/140.png',
                flag: 'https://media.api-sports.io/flags/es.svg',
                season: 2025,
                round: 'Regular Season - 24',
            },
            teams: {
                home: {
                    id: 541,
                    name: 'Real Madrid',
                    logo: 'https://media.api-sports.io/football/teams/541.png',
                    winner: null,
                },
                away: {
                    id: 529,
                    name: 'Barcelona',
                    logo: 'https://media.api-sports.io/football/teams/529.png',
                    winner: null,
                },
            },
            goals: { home: null, away: null },
            score: {
                halftime: { home: null, away: null },
                fulltime: { home: null, away: null },
                extratime: { home: null, away: null },
                penalty: { home: null, away: null },
            },
        },
        {
            fixture: {
                id: 4,
                referee: 'Daniele Orsato',
                timezone: 'UTC',
                date: `${dateString}T19:45:00+00:00`,
                timestamp: new Date(`${dateString}T19:45:00`).getTime() / 1000,
                periods: { first: null, second: null },
                venue: { id: 4, name: 'San Siro', city: 'Milan' },
                status: { long: 'Not Started', short: 'NS', elapsed: null },
            },
            league: {
                id: 135,
                name: 'Serie A',
                country: 'Italy',
                logo: 'https://media.api-sports.io/football/leagues/135.png',
                flag: 'https://media.api-sports.io/flags/it.svg',
                season: 2025,
                round: 'Regular Season - 24',
            },
            teams: {
                home: {
                    id: 489,
                    name: 'AC Milan',
                    logo: 'https://media.api-sports.io/football/teams/489.png',
                    winner: null,
                },
                away: {
                    id: 505,
                    name: 'Inter',
                    logo: 'https://media.api-sports.io/football/teams/505.png',
                    winner: null,
                },
            },
            goals: { home: null, away: null },
            score: {
                halftime: { home: null, away: null },
                fulltime: { home: null, away: null },
                extratime: { home: null, away: null },
                penalty: { home: null, away: null },
            },
        },
        {
            fixture: {
                id: 5,
                referee: 'Felix Brych',
                timezone: 'UTC',
                date: `${dateString}T17:30:00+00:00`,
                timestamp: new Date(`${dateString}T17:30:00`).getTime() / 1000,
                periods: { first: null, second: null },
                venue: { id: 5, name: 'Signal Iduna Park', city: 'Dortmund' },
                status: { long: 'Not Started', short: 'NS', elapsed: null },
            },
            league: {
                id: 78,
                name: 'Bundesliga',
                country: 'Germany',
                logo: 'https://media.api-sports.io/football/leagues/78.png',
                flag: 'https://media.api-sports.io/flags/de.svg',
                season: 2025,
                round: 'Regular Season - 22',
            },
            teams: {
                home: {
                    id: 165,
                    name: 'Borussia Dortmund',
                    logo: 'https://media.api-sports.io/football/teams/165.png',
                    winner: null,
                },
                away: {
                    id: 157,
                    name: 'Bayern Munich',
                    logo: 'https://media.api-sports.io/football/teams/157.png',
                    winner: null,
                },
            },
            goals: { home: null, away: null },
            score: {
                halftime: { home: null, away: null },
                fulltime: { home: null, away: null },
                extratime: { home: null, away: null },
                penalty: { home: null, away: null },
            },
        },
    ]

    return baseMatches
}

// Mock API Service
export const mockAPI = {
    // User endpoints
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockUsers[username] || mockUsers[1]
                if (user) {
                    resolve({
                        token: 'mock-jwt-token-' + Date.now(),
                        user: user,
                    })
                } else {
                    reject({ response: { data: { error: 'Invalid credentials' } } })
                }
            }, 500)
        })
    },

    getUser: (userId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = mockUsers[userId] || mockUsers[1]
                resolve(user)
            }, 300)
        })
    },

    // League endpoints
    getPopularLeagues: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockPopularLeagues)
            }, 500)
        })
    },

    // Match endpoints
    getMatchesByDate: (dateString) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const matches = generateMockMatches(dateString)
                resolve(matches)
            }, 600)
        })
    },
}
