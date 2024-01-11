import axios from "axios";

const elasticCloudUrl = 'https://9c2f0ce9db3c441da3a787d9d3742630.us-central1.gcp.cloud.es.io:443'; // Substitua pelo seu URL do Elasticsearch na Elastic Cloud
const elasticCloudCredentials = 'elastic:v8iKkXfoJM0Zlx4Q2241Vw3u'; // Substitua pelo seu usuário e senha

const cloudId = 'oh-my-search:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDljMmYwY2U5ZGIzYzQ0MWRhM2E3ODdkOWQzNzQyNjMwJDc0NDE0OTFhYWYyMDQ2NjI5OGE3ZWJhYzc0ZWNkNTM0';

const api2 = axios.create({
    baseURL: elasticCloudUrl,
    auth: {
        username: elasticCloudCredentials.split(':')[0],
        password: elasticCloudCredentials.split(':')[1]
    }
})


const api = axios.create({
    baseURL: "http://localhost:9200/"
})

// api2.get("laws/_search")
// .then(response => {
//     console.log("hello", response.data);
// })
// .catch(error => {
//     console.error(error);
// });

export default api2