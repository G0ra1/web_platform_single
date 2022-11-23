import JSEncrypt from "jsencrypt";
export default {
  encrypt(word) {
    var encryptor = new JSEncrypt();
    var pubKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6y1qFz1PxMfoKIEx0GllwwjzsyAUFBFGTKMILiVuHXi4kX0uvcd9VcUUq/JMUg/3C/In4ZWkIbqN4EvF35bRk3+v+gdl14ypq2C02mWg/OghnhtGxUsg8rWZVrNB9GjaCtKXQ462+H/HTtcDKTOsLe6jg76coI2bwbH5QFtX2JwIDAQAB`;
    encryptor.setPublicKey(pubKey);
    var rsaPassWord = encryptor.encrypt(word);
    return rsaPassWord;
  }
};
