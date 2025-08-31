import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert, Row, Col, Badge } from "react-bootstrap";
import { validateFile } from "../utils/fileUtils";

const FileUpload = ({ onUpload, uploadStatus, isUploading }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [dragActive, setDragActive] = useState(false);
	const [validationError, setValidationError] = useState("");
	const [selectedGroup, setSelectedGroup] = useState("");
	const [selectedReport, setSelectedReport] = useState("");
	const [rememberGroup, setRememberGroup] = useState(false);

	// 組別與報表配置
	const reportConfig = {
		帳一組: ["應收帳款明細表", "應付帳款明細表", "會計科目餘額表", "試算表"],
		帳二組: [
			"固定資產明細表",
			"折舊計算表",
			"預付費用明細表",
			"遞延收入明細表",
		],
		股務組: ["股東名冊", "持股分析表", "股利發放明細", "股權變動表"],
		稅務組: ["營業稅申報表", "所得稅計算表", "扣繳憑單明細", "稅務調節表"],
		管會組: ["管理會計報表", "成本分析表", "預算執行表", "績效分析報告"],
		RPA組: ["RPA流程報告", "自動化執行記錄", "系統整合報表", "效率分析報告"],
	};

	// 資料來源配置
	const dataSourceConfig = {
		// 帳一組報表
		應收帳款明細表: [
			"客戶基本資料檔",
			"應收帳款總帳",
			"銷售發票明細",
			"收款記錄檔",
		],
		應付帳款明細表: [
			"供應商基本資料檔",
			"應付帳款總帳",
			"進貨發票明細",
			"付款記錄檔",
		],
		會計科目餘額表: ["會計科目表", "總分類帳", "期初餘額檔", "調整分錄檔"],
		試算表: ["總分類帳餘額", "會計科目表", "期初期末餘額", "損益科目明細"],

		// 帳二組報表
		固定資產明細表: [
			"固定資產卡片檔",
			"資產異動記錄",
			"資產類別設定檔",
			"資產位置檔",
		],
		折舊計算表: [
			"固定資產明細",
			"折舊方法設定",
			"耐用年限表",
			"折舊費用分攤檔",
		],
		預付費用明細表: [
			"預付費用登記檔",
			"攤銷計算表",
			"費用分類檔",
			"預付項目明細",
		],
		遞延收入明細表: [
			"遞延收入登記檔",
			"收入認列計算表",
			"合約收入明細",
			"分期收款記錄",
		],

		// 股務組報表
		股東名冊: ["股東基本資料檔", "持股異動記錄", "股票發行檔", "股東會議記錄"],
		持股分析表: [
			"股東持股明細",
			"持股比例計算檔",
			"股票類別檔",
			"持股變動記錄",
		],
		股利發放明細: [
			"股利政策檔",
			"可分配盈餘計算",
			"股東持股記錄",
			"股利發放記錄",
		],
		股權變動表: [
			"股權異動申請書",
			"股票過戶記錄",
			"董監事異動檔",
			"股權結構檔",
		],

		// 稅務組報表
		營業稅申報表: [
			"銷項稅額明細",
			"進項稅額明細",
			"免稅銷售額明細",
			"營業稅計算檔",
		],
		所得稅計算表: [
			"財務報表資料",
			"稅務調整明細",
			"暫時性差異檔",
			"所得稅費用計算",
		],
		扣繳憑單明細: [
			"薪資發放記錄",
			"扣繳稅額計算",
			"員工基本資料",
			"各類所得明細",
		],
		稅務調節表: [
			"會計損益明細",
			"稅務調整項目",
			"暫時性差異分析",
			"應納稅額計算",
		],

		// 管會組報表
		管理會計報表: [
			"成本中心設定檔",
			"費用分攤基礎",
			"預算執行資料",
			"實際成本明細",
		],
		成本分析表: [
			"直接材料成本",
			"直接人工成本",
			"製造費用明細",
			"成本計算基礎檔",
		],
		預算執行表: ["年度預算檔", "月別預算明細", "實際執行數據", "差異分析資料"],
		績效分析報告: [
			"關鍵績效指標",
			"財務比率資料",
			"營運數據檔",
			"績效目標設定檔",
		],

		// RPA組報表
		RPA流程報告: [
			"自動化流程清單",
			"執行記錄檔",
			"錯誤處理記錄",
			"流程效益分析",
		],
		自動化執行記錄: [
			"機器人執行日誌",
			"任務排程檔",
			"執行結果統計",
			"異常處理記錄",
		],
		系統整合報表: [
			"系統介接記錄",
			"資料同步日誌",
			"API呼叫記錄",
			"整合狀態監控",
		],
		效率分析報告: [
			"作業時間記錄",
			"人工vs自動效率",
			"成本節約分析",
			"投資報酬率計算",
		],
	};

	const handleFileSelect = (file) => {
		setValidationError("");

		// 驗證檔案
		const validation = validateFile(file);
		if (!validation.isValid) {
			setValidationError(validation.errors.join(", "));
			setSelectedFile(null);
			return;
		}

		setSelectedFile(file);
	};

	const handleInputChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const file = e.dataTransfer.files[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	// 載入預設組別
	useEffect(() => {
		const savedGroup = localStorage.getItem("defaultGroup");
		const savedRemember = localStorage.getItem("rememberGroup") === "true";

		if (savedGroup && savedRemember) {
			setSelectedGroup(savedGroup);
			setRememberGroup(true);
		}
	}, []);

	// 處理組別變更
	const handleGroupChange = (e) => {
		const group = e.target.value;
		setSelectedGroup(group);
		setSelectedReport(""); // 重置報表選擇

		// 如果勾選記憶功能，儲存到 localStorage
		if (rememberGroup) {
			if (group) {
				localStorage.setItem("defaultGroup", group);
			} else {
				localStorage.removeItem("defaultGroup");
			}
		}
	};

	// 處理報表變更
	const handleReportChange = (e) => {
		setSelectedReport(e.target.value);
	};

	// 處理記憶功能切換
	const handleRememberChange = (e) => {
		const remember = e.target.checked;
		setRememberGroup(remember);
		localStorage.setItem("rememberGroup", remember);

		if (remember && selectedGroup) {
			localStorage.setItem("defaultGroup", selectedGroup);
		} else if (!remember) {
			localStorage.removeItem("defaultGroup");
		}
	};

	const handleUpload = () => {
		if (selectedFile && selectedGroup && selectedReport && onUpload) {
			onUpload({
				file: selectedFile,
				group: selectedGroup,
				report: selectedReport,
			});
		}
	};

	return (
		<Card className='mb-4'>
			<Card.Header>
				<h5 className='mb-0'>
					<i className='bi bi-upload me-2'></i>
					上傳報表
				</h5>
			</Card.Header>
			<Card.Body>
				{/* 組別和報表選擇區域 */}
				<Row className='mb-4'>
					<Col md={4}>
						<Form.Group>
							<div className='d-flex justify-content-between'>
								<Form.Label className='fw-bold'>
									<i className='bi bi-people me-2'></i>
									組別
								</Form.Label>
								<Form.Check
									type='checkbox'
									id='rememberGroup'
									label='記憶組別'
									checked={rememberGroup}
									onChange={handleRememberChange}
									className='mb-2'
								/>
							</div>
							<Form.Select
								value={selectedGroup}
								onChange={handleGroupChange}
								className='mb-2'>
								<option value=''>請選擇組別</option>
								{Object.keys(reportConfig).map((group) => (
									<option key={group} value={group}>
										{group}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group>
							<Form.Label className='fw-bold'>
								<i className='bi bi-file-earmark-text me-2'></i>
								目標報表
							</Form.Label>
							<Form.Select
								value={selectedReport}
								onChange={handleReportChange}
								disabled={!selectedGroup}
								className='mb-2'>
								<option value=''></option>
								{selectedGroup &&
									reportConfig[selectedGroup]?.map((report) => (
										<option key={report} value={report}>
											{report}
										</option>
									))}
							</Form.Select>
						</Form.Group>
					</Col>
					
					{/* 配置資訊顯示 */}
					<Col md={4}>
						<Alert variant='success' className='mb-0 py-2'>
							<small>
								<i className='bi bi-check-circle me-1'></i>
								配置已載入<br/>
								組別: {Object.keys(reportConfig).length} 個
							</small>
						</Alert>
					</Col>
				</Row>

				{/* 主要內容區域：左側資料來源，右側上傳區 */}
				<Row>
					{/* 左側：所需資料來源 */}
					<Col lg={5}>
						<Card className='h-100 data-source-card'>
							<Card.Header className='bg-light'>
								<h6 className='mb-0 text-muted'>
									<i className='bi bi-database me-2'></i>
									所需資料來源
								</h6>
							</Card.Header>
							<Card.Body>
								{selectedReport && dataSourceConfig[selectedReport] ? (
									<>
										<div className='mb-3'>
											<Badge bg='info' className='fs-6 px-3 py-2'>
												{selectedReport}
											</Badge>
										</div>
										<div className='data-sources-list'>
											{(dataSourceConfig[selectedReport] || []).map((source, index) => (
												<div
													key={index}
													className='data-source-item d-flex align-items-center mb-2 p-2 bg-light rounded'>
													<div className='source-indicator me-3'>
														<i className='bi bi-file-earmark-data text-primary'></i>
													</div>
													<div className='source-info flex-grow-1'>
														<span className='fw-medium text-dark'>
															{source}
														</span>
													</div>
													<div className='source-status'>
														<Badge bg='secondary' className='small'>
															必要
														</Badge>
													</div>
												</div>
											))}
										</div>
										<div className='mt-3 p-3 bg-warning bg-opacity-10 rounded'>
											<small className='text-warning'>
												<i className='bi bi-exclamation-triangle me-1'></i>
												請確保所有必要的資料來源檔案已準備就緒
											</small>
										</div>
									</>
								) : (
									<div className='text-center text-muted py-5'>
										<i className='bi bi-inbox display-4 mb-3 d-block'></i>
										<p className='mb-0'>請先選擇目標報表</p>
										<small>系統將顯示該報表所需的資料來源清單</small>
									</div>
								)}
							</Card.Body>
						</Card>
					</Col>

					{/* 右側：檔案上傳區 */}
					<Col lg={7}>
						<Card className='h-100 upload-card'>
							<Card.Header className='bg-light'>
								<h6 className='mb-0'>
									<i className='bi bi-cloud-upload me-2'></i>
									檔案上傳區
								</h6>
							</Card.Header>
							<Card.Body>
								<div
									className={`upload-zone border-2 border-dashed rounded p-4 text-center mb-3 ${
										dragActive ? "border-primary bg-light" : "border-secondary"
									}`}
									onDragEnter={handleDrag}
									onDragLeave={handleDrag}
									onDragOver={handleDrag}
									onDrop={handleDrop}>
									<i className='bi bi-cloud-upload fs-1 text-muted mb-3'></i>
									<p className='mb-3'>拖拽檔案到此處，或點擊選擇檔案</p>
									<Form.Control
										type='file'
										accept='.xlsx,.xls,.csv'
										onChange={handleInputChange}
										className='d-none'
										id='fileInput'
									/>
									<Button
										variant='outline-primary'
										onClick={() => document.getElementById("fileInput").click()}
										disabled={isUploading || !selectedReport}>
										<i className='bi bi-folder2-open me-2'></i>
										選擇檔案
									</Button>
									<div className='mt-2'>
										<small className='text-muted'>
											支援格式：Excel (.xlsx, .xls) 和 CSV (.csv)
										</small>
									</div>
									{!selectedReport && (
										<div className='mt-3'>
											<small className='text-warning'>
												<i className='bi bi-exclamation-triangle me-1'></i>
												請先選擇目標報表
											</small>
										</div>
									)}
								</div>

								{validationError && (
									<Alert variant='danger'>
										<i className='bi bi-exclamation-triangle me-2'></i>
										{validationError}
									</Alert>
								)}

								{selectedFile && (
									<Alert variant='info'>
										<div className='d-flex justify-content-between align-items-center'>
											<div>
												<i className='bi bi-file-earmark me-2'></i>
												<strong>已選擇檔案：</strong> {selectedFile.name}
											</div>
											<Button
												variant='danger'
												size='sm'
												onClick={() => {
													setSelectedFile(null);
													setValidationError("");
													document.getElementById("fileInput").value = "";
												}}>
												<i className='bi bi-x'></i>
											</Button>
										</div>
									</Alert>
								)}

								{uploadStatus && (
									<Alert
										variant={
											uploadStatus.includes("失敗") ||
											uploadStatus.includes("錯誤")
												? "danger"
												: "success"
										}>
										<i
											className={`bi ${
												uploadStatus.includes("失敗") ||
												uploadStatus.includes("錯誤")
													? "bi-exclamation-triangle"
													: "bi-check-circle"
											} me-2`}></i>
										{uploadStatus}
									</Alert>
								)}

								<div className='d-flex justify-content-end'>
									<Button
										variant='primary'
										onClick={handleUpload}
										disabled={
											!selectedFile ||
											!selectedGroup ||
											!selectedReport ||
											isUploading
										}
										size='lg'>
										{isUploading ? (
											<>
												<span
													className='spinner-border spinner-border-sm me-2'
													role='status'
													aria-hidden='true'></span>
												上傳中...
											</>
										) : (
											<>
												<i className='bi bi-upload me-2'></i>
												上傳並處理
											</>
										)}
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default FileUpload;
