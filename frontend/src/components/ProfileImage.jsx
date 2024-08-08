import Image from "react-bootstrap/Image";

import React from "react";

function ProfileImage({ src }) {
  return <Image rounded src={src} width={40} height={40} />;
}

export default ProfileImage;
