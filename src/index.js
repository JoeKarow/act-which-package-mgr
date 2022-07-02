import { detect } from 'detect-package-manager';
import * as core from '@actions/core';
import styles from 'ansi-styles';

const rv = styles.modifier.inverse;
const b = styles.modifier.bold;

try {
  const pm = detect().then((result) => {
    core.setOutput('package_manager', result);
    core.info(
      `It looks like you're using ${rv.open}${b.open}${result}${rv.close}${b.close}.`
    );
  });
} catch (error) {
  core.error(error.message);
  core.setFailed(error.message);
}
