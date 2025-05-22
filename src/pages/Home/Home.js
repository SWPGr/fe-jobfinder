import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

import { IconAt } from '@tabler/icons-react';

import TextInputCustom from '../../components/TextInputCustom';

function Home() {
    const formLogin = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password must include at least 6 characters' : null),
        },
    });

    return (
        <>
            <formLogin>
                <TextInputCustom
                    label="Email"
                    placeholder="Enter your email"
                    key={formLogin.key.email}
                    {...formLogin.getInputProps('email')}
                />
                <TextInputCustom
                    label="Password"
                    placeholder="Enter your password"
                    key={formLogin.key.password}
                    {...formLogin.getInputProps('password')}
                    type="password"
                />
                <Button
                    type="submit"
                    onClick={() => {
                        if (formLogin.validate().hasErrors) {
                            return;
                        }
                        console.log('Form submitted:', formLogin.values);
                    }}
                    leftIcon={<IconAt size={16} />}
                    fullWidth
                    mt="md"
                >
                    Submit
                </Button>
            </formLogin>
        </>
    );
}

export default Home;
