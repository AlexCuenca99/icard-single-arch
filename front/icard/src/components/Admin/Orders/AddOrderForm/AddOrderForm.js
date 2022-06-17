import React, { useState, useEffect } from 'react';
import { Form, Image, Button, Dropdown } from 'semantic-ui-react';
import { map } from 'lodash';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useFood, useOrder } from '../../../../hooks';
import './AddOrderForm.scss';

export function AddOrderForm(props) {
	const { idTable, openCloseModal, onRefetchOrders } = props;
	const [foodsFormat, setFoodsFormat] = useState([]);
	const [foodsData, setFoodsData] = useState([]);
	const { foods, getFoods, getFoodById } = useFood();
	const { addOrderToTable } = useOrder();

	useEffect(() => {
		getFoods();
	}, []);

	useEffect(() => {
		setFoodsFormat(formatDropdownData(foods));
	}, [foods]);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		validateOnChange: false,
		onSubmit: async (formValue) => {
			for await (const idFood of formValue.foods) {
				await addOrderToTable(idTable, idFood);
			}
			onRefetchOrders();
			openCloseModal();
		},
	});

	useEffect(() => {
		addFoodList();
	}, [formik.values]);

	const addFoodList = async () => {
		try {
			const foodsId = formik.values.foods;

			const arrayTemp = [];

			for await (const idFood of foodsId) {
				const response = await getFoodById(idFood);
				arrayTemp.push(response);
			}
			setFoodsData(arrayTemp);
		} catch (error) {
			console.log(error);
		}
	};

	const removeFoodList = (index) => {
		const idFoods = [...formik.values.foods];
		idFoods.splice(index, 1);
		formik.setFieldValue('foods', idFoods);
	};
	return (
		<Form className="add-order-form" onSubmit={formik.handleSubmit}>
			<Dropdown
				placeholder="Alimentos"
				fluid
				selection
				search
				options={foodsFormat}
				value={null}
				onChange={(_, data) =>
					formik.setFieldValue('foods', [
						...formik.values.foods,
						data.value,
					])
				}
			/>

			<div className="add-order-form__list">
				{map(foodsData, (food, index) => (
					<div className="add-order-form__list-product" key={index}>
						<div>
							<Image src={food.image} avatar size="tiny" />
							<span>{food.name}</span>
						</div>
						<Button
							type="button"
							content="Eliminar"
							basic
							color="red"
							onClick={() => removeFoodList(index)}
						/>
					</div>
				))}
			</div>
			<Button
				type="submit"
				primary
				fluid
				content="Añadir productos a la mesa"
			/>
		</Form>
	);
}

// Formateo de los datos de alimentos para adaptarlos al dropdown de Sematic
function formatDropdownData(data) {
	return map(data, (item) => ({
		key: item.id,
		text: item.name,
		value: item.id,
	}));
}

// Set de valores iniciales del form
function initialValues() {
	return {
		foods: [],
	};
}

function validationSchema() {
	return {
		foods: Yup.array().required(true),
	};
}
