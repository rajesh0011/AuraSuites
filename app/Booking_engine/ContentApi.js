

import Home from '../homepage';
import axios from "axios";

export default async function ContentApi() {
  let contentData = [];

  // try {

  //   const response = await axios.get("https://csbe-api.staah.net/?RequestType=info&PropertyId=51757", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": process.env.NEXT_PUBLIC_API_KEY_GETDATA
  //     },
  //   });

    
  //   const data = await response.data;

  //   if (data) {
  //     contentData = data;
  //   } else {
  //     //console.error('API responded with error:', data.message);
  //     console.error('API responded with error');
  //   }
  // } catch (error) {
  //   console.error('Server error:', error);
  // }

  return (
    <>
      <Home contentData={contentData} />
    </>
  );
}