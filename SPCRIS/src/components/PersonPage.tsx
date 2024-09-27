import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { replace, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { selectPerson } from "../redux/peopleSlice";
import { useNavigate } from "react-router-dom";

const PersonPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
    const dispatch = useDispatch<AppDispatch>();
    const selectedPerson = useSelector(
        (state: RootState) => state.people.selectedPerson
    );

    // Выбираем человека по ID при монтировании компонента
    useEffect(() => {
        if (id) {
            dispatch(selectPerson(Number(id)));
        }
    }, [id, dispatch]);

    if (!selectedPerson) {
        return <div>Пользователь не найден</div>;
    }

    return (
        <div>
            <h1>{selectedPerson.name}</h1>
            <p>Возраст: {selectedPerson.age}</p>
            <p>Email: {selectedPerson.email}</p>
            <p>Должнсть: {selectedPerson.position}</p>
            <p>Роль в системе: {selectedPerson.status}</p>
            <p>Уровень сотрудника: {selectedPerson.level}</p>
            <p>Формат работы: {selectedPerson.format}</p>
            <p>Команда: {selectedPerson.team}</p>
            <p>Пол: {selectedPerson.sex}</p>
            <p>Дата рождения: {selectedPerson.birthday}</p>
            <p>Бывшее место работы: {selectedPerson.exWork}</p>
            <p>Фото: {selectedPerson.photo}</p>
            <button
                onClick={() => {
                    navigate("/mainpage", { replace: true });
                }}>
                Домой
            </button>
        </div>
    );
};

export default PersonPage;
