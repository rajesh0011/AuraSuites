

import HomePage from '../homepage';

export default async function ContentApi() {
  let contentData = [];

  return (
    <>
      <HomePage contentData={contentData} />
    </>
  );
}