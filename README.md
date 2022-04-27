# Carothar-5e
A D&amp;D character management framework meant to be used with applications, GUI's or even just simple CLI. Still in early phases of development. Check the README for release goals and potential future plans!

## Installation
NO INSTALLATION OPTIONS AVAILABLE YET
Dev install: Make sure that npm and node.js are installed and then use this command in terminal - `npm install carothar5e axios`

CLI and GUI are still in development, but stay updated. The development for those will be located in seperate branches.

## Goals
To have a functional framework, we want to make sure that the major mechanical elements are implemented. The system should also be modular, to allow for custom content to flourish. Next, we need a way to actually interact with the framework. This can be done through interactive UIs that can highlight certain features and can be maintained by a community for the most positive feedback. I will be developing a CLI and GUI for this purpose.

- [ ] Major D&D Mechanics
    - [ ] Character creation
    - [ ] Item/Inventory Management
    - [ ] Attacking
- [ ] Custom Character Support
    - [ ] Custom Races
    - [ ] Custom Classes
    - [ ] Custom Classes
- [ ] Modular JS Script Building (For homebrew mechanics that GUIs can implement)
    - [ ] Custom Actions
- [ ] Documentation
    - [ ] utils
    - [ ] charManager
    - [ ] config/Setup
    - [ ] Carothar object use
- [ ] Object based instead of file based (Carothar object)

### Future Goals?
Carothar was originally meant to be a project that used modules in order to to be used in any RPG system if created correctly. Problem is, scope, skill, and time are things that need to be accounted for, and I do not have enough of those. With more experience and scope this is something that can come, but in the meantime, DnD is pretty fun. Carothar5e (meant for DnD, but can potentially be used for other things) allows me to help build up my development skill and eventually build an experience base that can be used in Carothar with enough traction. This was a lengthy explanation, but below is technical things for dev to use. Thanks for reading!

## Crediting
This software is under the Creative Commons Attribution-ShareAlike 4.0 License. This means that you need to credit the licensor and also use the same license if you are to also distribute the software. Although it is not required, if you do make another version of this software, please credit those listed in credits.txt for a full comprehensive list of those that contributed.

If you are also to make another version of this software, read the license at the bottom of this README so that you get a full understanding of it.

## Developer Quick Reference
For devs to use as a quick reference.
### Status Codes
A quick reference to current status codes. Will be updated with more once more functionality is put out. The status codes are to be used by Developers for certain cases.
sendStatus and returnInfo is used in the utils library and allows developers to use a callback in certain functions to use these.
- 1: Used for system related issues that are related to the programming.
    - 11: System error, use log for feedback or testing. Error will usually be put after _reason.
- 2: Relating to character creation and updating.
    - 21: Having to do with race loading.
        - 211: Race is not in lib, and could only load an index. Check lib/custom_races or lib/races. This can also relate to a misspelling of the name.
    - 22: Having to do with class loading.
        - 221: Class is not in lib, and could only load an index. Check lib/custom_classes or lib/custom_classes. This could also relate to a misspelling of a name.

## License
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.