import React from "react";
import styles from "./SocialNetwork.module.css";
import vk from "./vk.svg"
import tg from "./tg.svg"
interface ISocialNetwork{
  vertical:boolean
  className?:string
}
const SocialNetwork: React.FC<ISocialNetwork> = ({vertical, className}) => {
  return (
    <div className={(vertical ? styles.block__vertical : styles.block) + " "+ className}>
      <a href="">
        <img src={vk} alt="" />
      </a>
      <a href="">
        <img src={tg} alt="" />
      </a>
    </div>
  );
};

export default SocialNetwork;
