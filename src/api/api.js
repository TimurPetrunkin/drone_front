import axios from "axios";

const host = import.meta.env.VITE_BASE_URL;

export default class ServerData {

  static getStream = () => {
    // const random = Math.floor(Math.random() * 1000)
    // return host+"/camera?"+random
    return host+"/camera"
  }

  static getVideo(video){
    return host+"video/"+video
  }

  static getTranscript(transcript){
    return axios.get(host+"get_transcript/"+transcript)
  }

  static getModelClass(name){
    return axios.get(host+"get_model_class/"+name)
  }  

  static async getModels() {
    return await axios.get(host + "get_models");
  }

  static async getConnects() {
    return await axios.get(host + "get_connects");
  }
  static async getVideoList(limit,page) {
    return await axios.get(host + "get_video_list", {
      params:{
        limit,
        page,
      }
    });
  }

  static async setParams(data) {
    return await axios
      .post(host + "set_params", data, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static async offCamera() {
    return await axios
      .post(host + "off_camera")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static async saveConnect(connect){
      return await axios.post(host+"save_connect", connect, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    }
  
  static async deleteConnect(connect){
    return await axios.post(host+"delete_connect", connect, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  }

  static async deleteVideo(video){
    return await axios.post(host+"delete_video", video)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  }
}
