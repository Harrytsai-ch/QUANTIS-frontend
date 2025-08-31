import React, { useState } from "react";
import { Card, Row, Col, Form, InputGroup, Badge } from "react-bootstrap";
import ReportItem from "./ReportItem";
import { getDateLabel } from "../utils/dateUtils";

const ReportsList = ({ reports, onDownload, isLoading }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterDate, setFilterDate] = useState("all");

	// 過濾報表
	const filteredReports = reports.filter((report) => {
		const matchesSearch =
			report.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			report.filename.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesDate =
			filterDate === "all" || getDateLabel(report.createdAt) === filterDate;

		return matchesSearch && matchesDate;
	});

	// 取得所有可用的日期標籤
	const availableDateLabels = [
		...new Set(reports.map((report) => getDateLabel(report.createdAt))),
	];

	if (isLoading) {
		return (
			<Card>
				<Card.Header>
					<h5 className='mb-0'>
						<i className='bi bi-archive me-2'></i>
						歷史報表
					</h5>
				</Card.Header>
				<Card.Body className='text-center py-5'>
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>載入中...</span>
					</div>
					<div className='mt-3 text-muted'>載入報表清單中...</div>
				</Card.Body>
			</Card>
		);
	}

	return (
		<Card>
			<Card.Header>
				<div className='d-flex justify-content-between align-items-center'>
					<h5 className='mb-0'>
						<i className='bi bi-archive me-2'></i>
						歷史報表
						<Badge bg='secondary' className='ms-2'>
							{reports.length}
						</Badge>
					</h5>
				</div>
			</Card.Header>
			<Card.Body>
				{reports.length === 0 ? (
					<div className='text-center py-5 text-muted'>
						<i className='bi bi-inbox fs-1 mb-3 d-block'></i>
						<h6>尚無處理完成的報表</h6>
						<p className='mt-1'>上傳檔案並完成處理後，報表將會顯示在這裡</p>
					</div>
				) : (
					<>
						{/* 搜尋和篩選控制 */}
						{reports.length > 0 && (
							<Row className='mb-4'>
								<Col md={8}>
									<InputGroup>
										<InputGroup.Text>
											<i className='bi bi-search'></i>
										</InputGroup.Text>
										<Form.Control
											type='text'
											placeholder='搜尋任務 ID 或檔案名稱...'
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</InputGroup>
								</Col>
								<Col md={4}>
									<Form.Select
										value={filterDate}
										onChange={(e) => setFilterDate(e.target.value)}>
										<option value='all'>所有時間</option>
										{availableDateLabels.map((label) => (
											<option key={label} value={label}>
												{label}
											</option>
										))}
									</Form.Select>
								</Col>
							</Row>
						)}

						{/* 篩選結果提示 */}
						{filteredReports.length !== reports.length && (
							<div className='alert alert-info mb-3'>
								<i className='bi bi-info-circle me-2'></i>
								顯示 {filteredReports.length} 個結果，共 {reports.length} 個報表
								{(searchTerm || filterDate !== "all") && (
									<button
										className='btn btn-link btn-sm ms-2 p-0'
										onClick={() => {
											setSearchTerm("");
											setFilterDate("all");
										}}>
										清除篩選
									</button>
								)}
							</div>
						)}

						{/* 報表網格 */}
						{filteredReports.length === 0 ? (
							<div className='text-center py-4 text-muted'>
								<i className='bi bi-search fs-1 mb-3 d-block'></i>
								<h6>找不到符合條件的報表</h6>
								<p className='mb-0'>請試試其他搜尋關鍵字或篩選條件</p>
							</div>
						) : (
							<Row>
								{filteredReports.map((report) => (
									<Col key={report.taskId} lg={4} md={6} className='mb-3'>
										<ReportItem report={report} onDownload={onDownload} />
									</Col>
								))}
							</Row>
						)}
					</>
				)}
			</Card.Body>
		</Card>
	);
};

export default ReportsList;
