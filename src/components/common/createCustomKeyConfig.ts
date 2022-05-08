import { KeyConfig, CustomKeyConfig, DefaultKeyConfig } from "@/model/KeyConfig";

export function createCustomKeyConfig(): CustomKeyConfig {
  const customKeyConfigStr = localStorage.getItem("customKeyConfig");
  let keyConfig: KeyConfig;
  if (customKeyConfigStr) {
    const obj = JSON.parse(customKeyConfigStr) as CustomKeyConfig;
    keyConfig = Object.assign(DefaultKeyConfig, obj);
  } else {
    keyConfig = DefaultKeyConfig;
  }
  return keyConfig;
}
