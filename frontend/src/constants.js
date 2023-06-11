const prod = {
    url: {
     API_URL: 'https://shy-gray-spider-sock.cyclic.app/api/items',
     API_URL_LEADERBOARD: 'https://shy-gray-spider-sock.cyclic.app/api/leaderboard'
    }
    }

const dev = {
    url: {
     API_URL: 'http://localhost:8080/api/items',
     API_URL_LEADERBOARD: 'http://localhost:8080/api/leaderboard'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
   