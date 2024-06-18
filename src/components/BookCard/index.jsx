import { ActionIcon, Badge, Card, CardSection, Group, Image, Stack, Text } from "@mantine/core";
import { AiOutlineDelete } from "react-icons/ai";
import { useNotification } from "../Notification/NotificationContext";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuidv4 } from 'uuid';
import { readLocalStorageValue } from "@mantine/hooks";

export default function BookCard({ book }) {
    const { addNotification } = useNotification();
    const user = readLocalStorageValue({ key: 'user' })
    const userStore = Object.keys(user).length !== 0 ? true : false
    
    async function handleDelete() {

        if (userStore) {
            try {
                // Create a query to check if the document already exists
                const q = query(
                    collection(db, "book"),
                    where("name", "==", book.name) // Assuming 'name' is a unique field to check
                );
                const querySnapshot = await getDocs(q);


                if (!querySnapshot.empty) {
                    // Document exists, so get its reference and delete it
                    querySnapshot.forEach(async (docSnapshot) => {
                        const docRef = doc(db, "book", docSnapshot.id);
                        await deleteDoc(docRef);
                        addNotification({ id: uuidv4(), type: 'success', description: 'Delete Successfully' });
                    });

                } else {
                    addNotification({ id: uuidv4(), type: 'error', description: 'Document does not exist!' });
                }
            } catch (e) {
                addNotification({ id: uuidv4(), type: 'error', description: `${e}` })
                console.error('Error delete document:', e);
            }
        } else {
            addNotification({ id: uuidv4(), type: 'error', description: `You need to Login first` })
        }
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className="relative h-fit max-h-[535px] max-w-[320px]">
            <div className="absolute top-2 right-2">
                <ActionIcon
                    variant="transparent"
                    onClick={handleDelete}
                >
                    <AiOutlineDelete className="text-red-600 w-5 h-5" />
                </ActionIcon>
            </div>
            <CardSection component="a" href="#" maw={300} mx="auto" p={4}>
                <div
                    className="w-full h-[300px] flex items-center justify-center overflow-hidden"
                >
                    <Image
                        src="https://m.media-amazon.com/images/I/61GHrDrumhL._SY466_.jpg"

                        alt="Book"
                        className="w-full h-full object-contain"
                    />
                </div>


            </CardSection>

            <Stack justify="space-between" className="text-start" mt="md" mb="xs">
                {/* book name */}
                <Text fw={500} className="min-h-14 max-h-fit text-sm lg:text-base min-w-[278px]">{book.name}</Text>
                {
                    book.publication_year ?
                        <Group justify="space-between" className="items-center">
                            <span className="text-sm font-semibold">Public Year:</span>  <Badge color="pink">{book.publication_year}</Badge>
                        </Group>
                        :
                        <Group justify="space-between" className="items-center">
                            <span className="text-sm font-semibold">Public Year:</span>
                            <Badge color="gray">N/A</Badge>
                        </Group>
                }
                {/* publication_year: 2011 */}
            </Stack>
            {/* list_of_authors and rating*/}
            <Group justify="space-between" className="text-start">
                <Text size="sm" c="dark">
                    <span className="font-semibold">Author:</span>
                    {book.list_of_authors?.map((author) => ` ${author}, `)}
                </Text>
                {book.rating &&
                    <Text size="sm" className={`${book.rating > 7 ? 'text-green-600' : 'text-red-600'}`}>
                        Rating: {book.rating}
                    </Text>

                }
            </Group>
            {/* ISBN */}
            {book.ISBN ? (
                <Text size="sm" c="dimmed" className="text-start mt-2">
                    <span className="font-semibold">ISBN&nbsp;&nbsp;&nbsp;:</span> {book.ISBN}
                </Text>
            ) : (
                <Text size="sm" c="dimmed" className="text-start mt-2">
                    &nbsp;&nbsp;&nbsp;
                </Text>
            )
            }

        </Card>
    );
}