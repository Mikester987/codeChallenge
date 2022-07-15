import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addNewPost } from './blogSlice';

const NewPostForm = () => {
    const [ modalOpen, setModalOpen ] = useState();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        const post = {
        text: values.text,
        title: values.title,
        timestamp: new Date(Date.now()).toISOString()
        };
        console.log(post);
        dispatch(addNewPost(post));
        setModalOpen(false);
    };

    return (
    <>
        <Button onClick={() => setModalOpen(true)}>
            <i className='fa fa-pencil fa-lg' /> Add Post
        </Button>
        <Modal isOpen={modalOpen}>
            <ModalHeader
            toggle={()=>{setModalOpen(false)}}
            >
                Add Post
            </ModalHeader>
            <ModalBody>
                <Formik initialValues={{rating:undefined, author:'', postText:''}}
                    onSubmit={()=>handleSubmit()}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor='title'>
                                    Title
                                </Label>
                                <Field
                                    name='title'
                                    as='textarea'
                                    rows='12'
                                    className='form-control'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='text'>
                                    Text
                                </Label>
                                <Field
                                    name='text'
                                    as='textarea'
                                    rows='12'
                                    className='form-control'
                                />
                                <Button type='submit' color='primary'>
                                Submit
                                </Button>
                            </FormGroup>
                        </Form>
                </Formik>
            </ModalBody>
        </Modal>
    </>
    );

};

export default NewPostForm;