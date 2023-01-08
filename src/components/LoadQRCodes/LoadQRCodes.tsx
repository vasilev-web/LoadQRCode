import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import Input from '@kit/Input';

import QRCodes from '@api/QRCodes';
import GetBlobFile from '@helpers/GetBlobFile';

import styles from './LoadQRCodes.module.scss';

const trapSpacesForRequiredFields = (value) => !!value?.trim();

const LoadQRCodes = () => {
    const [image, setImage] = useState(null);
    const sizes = [50, 350];
    const ref = useRef(null);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const onSubmit = async (datas) => {
        try {
            const result = await QRCodes.get({ ...datas });
            const dataURL = await GetBlobFile(result?.data);
            setImage(dataURL);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Container>
                <Row className={clsx('mt-5', 'mb-3', 'justify-content-center')}>
                    <Col xs={12} className={clsx('mb-3')}>
                        <Row>
                            <Col xs={12}>
                                <Input
                                    label='Размер'
                                    type='number'
                                    name='size'
                                    placeholder='150'
                                    defaultValue='150'
                                    error={errors.size && errors.size.message}
                                    {...register('size', {
                                        validate: (value) =>
                                            (Number(value) !== value &&
                                                value >= sizes[0] &&
                                                value <= sizes[1]) ||
                                            `от ${sizes[0]} до ${sizes[1]}`
                                    })}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <Input
                            className={clsx('data')}
                            label='Ссылка для QR кода'
                            type='text'
                            name='data'
                            id='data'
                            placeholder='https://'
                            error={errors.data && errors.data.message}
                            {...register('data', {
                                pattern: {
                                    value: /^(https?):\/\/([a-z0-9-]{1,}\.)?([a-z0-9-]{2,})\.([a-z0-9]{2,})([\S]{1,})?$/g,
                                    message: 'Неверный формат ссылки'
                                },
                                validate: (value) => {
                                    return (
                                        trapSpacesForRequiredFields(value) ||
                                        'Поле обязательно к заполнению'
                                    );
                                }
                            })}
                        />
                    </Col>
                </Row>
                {image ? (
                    <>
                        <Row
                            className={clsx('mb-3', 'align-items-center', 'justify-content-center')}
                        >
                            <Col xs={12}>
                                <Row className={clsx('row', 'align-items-center')}>
                                    <Col xs='auto'>
                                        <a ref={ref} href={image} download>
                                            <Image className='md-3' src={image} />
                                        </a>
                                    </Col>
                                    <Col>
                                        <Button
                                            onClick={() => ref.current.click()}
                                            variant='outline-secondary'
                                            size='lg'
                                        >
                                            Сохранить
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
                ) : (
                    ''
                )}
                <Row className={clsx('justify-content-center')}>
                    <Col xs={12}>
                        <Button type='submit'>Получить код</Button>
                    </Col>
                </Row>
            </Container>
        </form>
    );
};

export default LoadQRCodes;
