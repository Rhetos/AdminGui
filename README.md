# AdminGui
AdminGui plugin provides a beautiful dashboard to manage data tables of a Rhetos server.

<p align="center">
  <a>
    <img src="./Assets/AdminGui_01.png" alt="AdminGui Dashboard" width="1024">
  </a>
</p>

# Installation
Head over to [Release section](https://github.com/Rhetos/AdminGui/releases) to download this plugin or you can clone and [build it from source](README.md#Build-from-source).

# Usage
Coming soon.

# Getting involved
## Prerequisites
- Nuget.
- Npm.
- .NET Framework Development Pack.
- MSBuild 14+ (or .NET SDK).
- An IDE (Visual Studio, Visual Studio Code, Sublime, Notepad++, etc.)

## Build from source
1. Fork the `AdminGui` repository and clone it locally.
2. Ensure you have `nuget` and `npm` commands available at your %PATH%. NuGet version 4.0+ is recommended. Older versions are not tested.
3. Get inside AdminGui directory, run `.\Publish` in Powershell.
4. After it's done, the publish outputs are located inside `PublishOutput` directory.

Note, you can specify a version for the packages by passing the `BuildVersion` parameter to the command. For example, `.\Publish -BuildVersion "1.2.0"`.

## Contributing
1. Fork the `AdminGui` repository and clone it locally.
2. Download and prepare the development environment:
```
.\Init
```

3. After this step, you are ready to begin!

4. Build the latest changes and run a local testing Rhetos server (By default, it is listening on http://localhost:9000).
```
.\Run
```
Please note, we currently do not support hot-reloaded, which means if you make new changes in the source code, you have to stop the server and excute the command `.\Run` again.