import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ActionIcon, Avatar, Button, Image, Menu, MenuItem } from "@mantine/core"
import { auth } from "../../config/firebase";
import Logo from '../../assets/logo.png';
import { useNotification } from "../Notification/NotificationContext";
import { v4 as uuidv4 } from 'uuid';
import { CiMail, CiUser } from "react-icons/ci";
import { useDisclosure, useLocalStorage } from '@mantine/hooks'
import Form from "../Form";
import { useEffect } from "react";
export default function Header({ isAuth, setIsAuth, profile, setProfile }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [user, setUser] = useLocalStorage({ key: 'user', defaultValue: {} })
    const { addNotification } = useNotification();

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            setIsAuth(false)
            setProfile({})
        } else {
            setIsAuth(true)
            setProfile(JSON.parse(user))
        }
    }, [user, setIsAuth, setProfile])

    const handleAuthentication = async () => {

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider)
            const user = result?.user;

            setIsAuth(true);
            setProfile(user?.providerData[0]);
            setUser(JSON.stringify(user?.providerData[0]))
            addNotification({ id: uuidv4(), type: 'success', description: `Welcome ${user?.providerData[0].email}!` })
        } catch (e) {
            console.error(e);
            addNotification({ id: uuidv4(), type: 'error', description: 'Some Error!' })
        }
    }

    const handleSignOut = async () => {

        try {
            await signOut(auth);

            setIsAuth(false);
            setProfile({});
            setUser({})
            addNotification({ id: uuidv4(), type: 'success', description: 'User logout successfully!' })
        } catch (e) {
            console.error(e)
            addNotification({ id: uuidv4(), type: 'error', description: 'Server Error!' })
        }
    }

    const handleCreate = () => {
        if (isAuth && Object.keys(user).length !== 0) {
            open();
        } else {
            addNotification({ id: uuidv4(), type: 'error', description: 'You need to login with Google first!' })
        }
    }


    return (
        <header className="w-full relative text-center flex flex-row justify-between items-center h-16 bg-black/5 p-4">
            <ActionIcon
                className="w-10 h-10"
                variant="transparent"
            >
                <Image
                    src={Logo}
                    className="w-10 h-10"
                />
            </ActionIcon>
            <h1>Book Catalog</h1>
            <div className="flex flex-row gap-2 items-center">

                <Button
                    variant="outline"
                    color="blue"
                    onClick={handleCreate}
                >
                    Create
                </Button>

                {
                    isAuth && profile ?

                        <Menu>
                            <Menu.Target>
                                <Avatar
                                    className="cursor-pointer"
                                    radius="xl"
                                    src={profile?.photoURL || ""}
                                />

                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>
                                    <div className="flex flex-row gap-x-2 items-center">
                                        <CiMail className="w-4 h-4" />:
                                        <h4 className="my-0">{profile?.email}</h4>
                                    </div>
                                </Menu.Label>
                                <Menu.Label>
                                    <div className="flex flex-row gap-x-2 items-center">
                                        <CiUser className="w-4 h-4" />:
                                        <p className="my-0 font-light text-gray-400">{profile?.displayName}</p>
                                    </div>
                                </Menu.Label>
                                <Menu.Divider />
                                <MenuItem
                                    color="red"
                                    onClick={handleSignOut}
                                >
                                    Signout
                                </MenuItem>
                            </Menu.Dropdown>
                        </Menu>
                        :
                        (

                            <Button
                                onClick={!isAuth && handleAuthentication}
                                variant="outline"
                            >
                                Login
                            </Button>

                        )
                }

                <Form opened={opened} close={close} />
            </div>
        </header>
    );
}