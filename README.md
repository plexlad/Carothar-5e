# Carothar-5e
A D&amp;D character management framework meant to be used with applications, GUI's or even just simple CLI. Still in early phases of development. Check the README for release goals and potential future plans!

## Goals
To have a functional framework, we want to make sure that the major mechanical elements are implemented. The system should also be modular, to allow for custom content to flourish. Next, we need a way to actually interact with the framework. This can be done through interactive UIs that can highlight certain features and can be maintained by a community for the most positive feedback. I will be developing a CLI and GUI for this purpose.

- [ ] Major D&D Mechanics
    - [ ] Character creation
    - [ ] Item/Inventory Management
    - [ ] Attacking
- [ ] Custom Character Support
- [ ] Modular JS Script Building (For homebrew mechanics that GUIs can implement)
- [ ] Documentation

### Future Goals?
Carothar was originally meant to be a project that used modules in order to to be used in any RPG system if created correctly. Problem is, scope, skill, and time are things that need to be accounted for, and I do not have enough of those. With more experience and scope this is something that can come, but in the meantime, DnD is pretty fun. Carothar5e (meant for DnD, but can potentially be used for other things) allows me to help build up my development skill and eventually build an experience base that can be used in Carothar with enough traction. This was a lengthy explanation, but below is technical things for dev to use. Thanks for reading!

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
