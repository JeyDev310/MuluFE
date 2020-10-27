import axios from "axios";

const DOMAIN = "http://localhost:8000";

export default {
  async baseApi(sub_url, method, json_data, cb) {
    const token = localStorage.token ? localStorage.token : null
    try {
      let request = {
        method,
        url: DOMAIN + sub_url,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": token
            ? "Bearer " + token
            : null,
        },
        data: JSON.stringify(json_data)
      };
      axios(request)
        .then((response) => {
          cb(null, response.data)
        },
          (error) => { cb(error); }
        );
    } catch (error) {
      cb(error);
    }
  },

  // Auth
  login(email, password, cb) {
    this.baseApi('/api/login', 'POST', { email, password }, (err, res) => {
      cb(err, res)
    })
  },
  register(data, cb) {
    this.baseApi('/api/register', 'POST', data, (err, res) => {
      cb(err, res)
    })
  },
}