package com.bupko.reader;

import android.os.Bundle; // splash & Auto-hide navigation bar 
import android.view.ActionMode; // Text Selection Toolbar
import android.view.Menu; // Text Selection Toolbar
import com.facebook.react.ReactActivity;

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "bupkoReader";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // splash
    super.onCreate(savedInstanceState);
  }

  // Hide Text Selection Toolbar
  @Override
  public void onActionModeStarted(ActionMode mode) {
    Menu menu = mode.getMenu();
    menu.clear();
    super.onActionModeStarted(mode);
  }
}
