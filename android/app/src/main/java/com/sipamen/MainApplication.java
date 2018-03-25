package com.sipamen;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.chirag.RNMail.RNMail;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerPackage(),
            new SplashScreenReactPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new ReactNativeOneSignalPackage(),
            new RNMail(),
            new ImagePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
