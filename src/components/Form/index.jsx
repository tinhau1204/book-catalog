import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNotification } from "../Notification/NotificationContext";
import { v4 as uuidv4 } from 'uuid';

export default function Form({ opened, close }) {
    const { addNotification } = useNotification();

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            list_of_authors: '', //book should have at least one author.
            publication_year: '',
            rating: '',
            ISBN: '',
        },
        validate: {
            name: (value) => (/^\s*$/.test(value) ? 'Book name must not be empty' : null),
            list_of_authors: (value) => {
                // Regex to check if the string contains at least one word (author)
                const regex = /^\s*([a-zA-Z0-9]+(\s*,\s*[a-zA-Z0-9]+)*)\s*$/;
                if (regex.test(value)) {
                    return null;
                } else {
                    return 'List of authors must contain at least one word, separated by commas';
                }
            },
            rating: (value) => {
                if (value.trim() === '') return null; // Optional field
                const ratingNum = Number(value);
                if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
                    return 'Rating must be a number between 0 and 10';
                }
                return null;
            },
            publication_year: (value) => {
                if (value.trim() === '') return null; // Optional field
                const currentYear = new Date().getFullYear();
                if (!/^\d{4}$/.test(value) || Number(value) > currentYear || Number(value) < 1800) {
                    return 'Year need to greater than 1800 and smaller than current year';
                }
                return null;
            },
            ISBN: (value) => {
                if (value.trim() === '') return null; // Optional field
                const isbn10 = /^(?:\d[\ |-]?){9}[\d|X]$/i;
                const isbn13 = /^(?:\d[\ |-]?){13}$/i;
                if (!isbn10.test(value) && !isbn13.test(value)) {
                    return 'Please enter a valid ISBN (ISBN-10 or ISBN-13)';
                }
                return null;
            },
        },
    });

    async function handleOnSubmit(values) {
        try {
            const req = {
                ...values,
                list_of_authors: values.list_of_authors.split(',').map(author => author.trim())
            };

            // Create a query to check if the document already exists
            const q = query(
                collection(db, "book"),
                where("name", "==", req.name) // Assuming 'name' is a unique field to check
            );

            // Execute the query
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Document already exists
                addNotification({ id: uuidv4(), type: 'error', description: 'Document already exists!' });
                return;
            }

            const docRef = await addDoc(collection(db, "book",), req)
            // form.onReset();
            close();
            addNotification({ id: uuidv4(), type: 'success', description: 'Created Data Successfully!' })

        } catch (e) {
            addNotification({ id: uuidv4(), type: 'error', description: `${e}` })
            console.error('Error adding document:', e);
        }
    }
    return (
        <Modal opened={opened} onClose={close} title="Add Book" >
            <form
                onSubmit={
                    form.onSubmit(handleOnSubmit)
                }
                className="[&>*]:mb-2"
                onReset={form.onReset}
            >
                <TextInput
                    withAsterisk
                    label="Book Name"
                    placeholder="book name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

                <TextInput
                    withAsterisk
                    label="List of authors"
                    placeholder="author1, author2, ..."
                    key={form.key('list_of_authors')}
                    {...form.getInputProps('list_of_authors')}
                />

                <TextInput
                    label="Public year"
                    placeholder="2011"
                    key={form.key('publication_year')}
                    {...form.getInputProps('publication_year')}
                />

                <TextInput
                    label="Rating"
                    placeholder="9"
                    key={form.key('rating')}
                    {...form.getInputProps('rating')}
                />

                <TextInput
                    label="ISBN"
                    placeholder="ISBN"
                    key={form.key('ISBN')}
                    {...form.getInputProps('ISBN')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal >
    );
}