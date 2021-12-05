import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  //static token;

  static async request(endpoint, data = {}, method = "get") {
    //console.debug("API Call:", "endpoint: ", endpoint, "data: ", data, method);

    const token = window.localStorage.getItem("token");
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = method === "get" ? data : {};

    try {
      //console.log("sent a request with the following header: ", headers);
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /* Get a list of all companies */

  static async getCompanies(data) {
    let res = await this.request("companies", data);
    return res.companies;
  }

  /* get details on one job by id */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /* get a list of all jobs */

  static async getJobs(data) {
    let res = await this.request(`jobs`, data);
    return res.jobs;
  }

  /* register new user */

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /* login  user */
  static async login(data) {
    console.log("trying to login API");
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /* get user */

  static async getUser(username) {
    console.log("getting user", username);
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async apply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

  static async edit(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

// for now, token ("testuser" / "password")
/* JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"; */

export default JoblyApi;
