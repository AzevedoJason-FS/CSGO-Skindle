const prod = {
    url: {
     API_URL: 'https://shy-gray-spider-sock.cyclic.app/api/items',
    }
    }

const dev = {
    url: {
     API_URL: 'http://localhost:8080/api/items'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
   