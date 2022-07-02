# Which package manager?

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/JoeKarow/act-which-package-mgr?style=plastic)
![GitHub](https://img.shields.io/github/license/JoeKarow/act-which-package-mgr?style=plastic)
![GitHub package.json version](https://img.shields.io/github/package-json/v/JoeKarow/act-which-package-mgr?style=plastic)

![Twitter Follow](https://img.shields.io/twitter/follow/JoeKarow?style=social)

A GitHub action that will quickly return which node.js package manager the current repo is using.

I threw this together to stick between `actions/checkout` and `actions/setup-node` in a workflow I am using to tell `actions/setup-node` which cache method to use.

No inputs are required. This will return the name of the package manager (`npm`, `pnpm` or `yarn`) to the output value `package_manager`.

## Example usage

```yaml
name: Run Linter
on:
  pull_request:
  push:
jobs:
  lint:
    name: Run Linter
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          ref: ${{ github.head_ref }}

        # This is the only setup needed #
      - name: Identify package manager
        id: pkgman
        uses: joekarow/act-which-package-mgr@v1
        #################################

      - name: Install package managers globally
        run: npm -g install pnpm yarn

      - name: Setup node env
        if: ${{ success() }}
        uses: actions/setup-node@v3
        with:
          node-version-file: ".nvmrc"
          cache: ${{ steps.pkgman.outputs.package_manager }} # This references the output value

      - name: Install dependencies
        if: ${{ success() }}
        uses: jaid/action-npm-install@v1.2.4
        with:
          packageManager: ${{ steps.pkgman.outputs.package_manager }}

      - name: Run lint step
        if: ${{ success() }}
        run: ${{ steps.pkgman.outputs.package_manager }} run lint

```

### Development

Setting up

```bash
git clone https://github.com/JoeKarow/act-which-package-mgr.git
cd act-which-package-mgr
pnpm install
```

After editing in the `src/` directory, run `pnpm run build` to compile.

`node dist/index.js` will execute the file.

## Support

Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/JoeKarow/act-which-package-mgr/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [this GitHub profile](https://github.com/JoeKarow)

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Authors & contributors

The original setup of this repository is by [Joe Karow](https://github.com/JoeKarow).

For a full list of all authors and contributors, see [the contributors page](https://github.com/JoeKarow/act-which-package-mgr/contributors).

## Security

act-which-package-mgr follows good practices of security, but 100% security cannot be assured.
act-which-package-mgr is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](docs/SECURITY.md)._

## License

This project is licensed under the **GNU General Public License v3**.

See [LICENSE](LICENSE) for more information.
