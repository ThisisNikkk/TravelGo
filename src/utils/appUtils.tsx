import checkVersion from "react-native-store-version";
import DeviceInfo from "react-native-device-info";
import { urls } from "../constants/urls";
import { config, Mode } from "../../config";
import { Platform, Text, TextInput } from "react-native";
import { ToastService } from "./ToastManager";

interface AppUtilsInterface {
  validatePhone: (phone: string) => boolean;
  validateEmail: (email: string) => boolean;
  fontSize: (size: number) => number;
  showToast: (text: string) => void;
  showLog: (message: string, ...optionalParams: any[]) => void;
  disableFontScale: () => void;
  adaCompliance: () => void;
  checkAppVersion: () => Promise<boolean>;
}

const AppUtils: AppUtilsInterface = {
  //Phone validation
  validatePhone: (phone: string) => {
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  },

  //Adjust Font Size
  fontSize(size) {
    return Platform.OS == 'ios' ? size : (size - 3)
  },

  //Email validation
  validateEmail: (email: string) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  },

  // Toast
  showToast: (text: string) => {
    setTimeout(() => {
      ToastService.show(text, 1000)
    }, 800);
  },

  // LOG
  showLog: (message: string, ...optionalParams: any[]) => {
    config.mode === Mode.DEV && console.log(message, ...optionalParams);
  },

  // Disable font size increase from phone settings
  disableFontScale: () => {
    (Text as any).defaultProps = (Text as any).defaultProps || {};
    (Text as any).defaultProps.allowFontScaling = false;
    (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
    (TextInput as any).defaultProps.allowFontScaling = false;
  },

  // Enable Ada compliance
  adaCompliance: () => {
    if ((TextInput as any).defaultProps == null) {
      (TextInput as any).defaultProps = {};
      (TextInput as any).defaultProps.maxFontSizeMultiplier = 1.4;
    }
    if ((Text as any).defaultProps == null) {
      (Text as any).defaultProps = {};
      (Text as any).defaultProps.maxFontSizeMultiplier = 1.4;
    }
  },

  // Check Update with live version's
  checkAppVersion: async () => {
    try {
      const check = await checkVersion({
        version: DeviceInfo.getVersion(), // app local version
        iosStoreURL: urls.iosAppLink,
        androidStoreURL: urls.androidAppLink,
      });
      if (check.result === "new") {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      AppUtils.showLog(e as string);
      return false;
    }
  },
};

export default AppUtils;
