import { useState, useEffect } from "react";
import EventsService from "../../../services/events.service";
import { Link } from "react-router-dom";

const EventsList = () => {
	const [events, setEvents] = useState([]);
	const [sortField, setSortField] = useState(null);
	const [sortDirection, setSortDirection] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const handleSort = (field) => {
		let direction = "asc";
		if (sortField === field && sortDirection === "asc") {
			direction = "desc";
		}
		setSortField(field);
		setSortDirection(direction);
	};

	useEffect(() => {
		async function fetchData() {
			const data = await EventsService.getAll();
			if (sortField !== null) {
				data.data.sort((a, b) => {
					if (a[sortField] < b[sortField]) {
						return sortDirection === "asc" ? -1 : 1;
					}
					if (a[sortField] > b[sortField]) {
						return sortDirection === "asc" ? 1 : -1;
					}
					return 0;
				});
			}
			setEvents(data.data);
		}

		fetchData();
	}, [sortField, sortDirection]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredEvents = events.filter(
		(event) =>
			event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.location.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<main>
			<section className="py-4">
				<div className="d-flex justify-content">
					<Link to={"/"} className="btn btn-secondary px-4 mx-2">
						Voltar
					</Link>

					<Link to={"/event"} className="btn btn-success px-4 mx-2">
						Criar
					</Link>

					<input
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</div>
			</section>

			<section>
				<table className="table table-dark table-hover">
					<thead>
						<tr>
							<th scope="col" onClick={() => handleSort("id")}>
								#
							</th>
							<th scope="col" onClick={() => handleSort("title")}>
								Título
							</th>
							<th scope="col" onClick={() => handleSort("description")}>
								Descrição
							</th>
							<th scope="col" onClick={() => handleSort("category")}>
								Categoria
							</th>
							<th scope="col" onClick={() => handleSort("location")}>
								Local
							</th>
							<th scope="col" onClick={() => handleSort("startDate")}>
								Data de Ínicio
							</th>
							<th scope="col" onClick={() => handleSort("endDate")}>
								Data de Término
							</th>
							<th scope="col" onClick={() => handleSort("notes")}>
								Notas
							</th>
							<th scope="col">Ações</th>
						</tr>
					</thead>

					<tbody>
						{filteredEvents.map((event, index) => (
							<tr key={index}>
								<td>{event.id}</td>
								<td>{event.title}</td>
								<td>{event.description}</td>
								<td>{event.category}</td>
								<td>{event.location}</td>
								<td>{new Date(event.startDate).toLocaleDateString()}</td>
								<td>{new Date(event.endDate).toLocaleDateString()}</td>
								<td>{event.notes}</td>
								<td>
									<div className="d-flex justify-content">
										<Link
											to={`/event/${event.id}`}
											className="btn btn-primary me-2"
										>
											Editar
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</main>
	);
};

export default EventsList;
