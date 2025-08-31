import React, { useState, useEffect } from "react";
import { Container, Toast, ToastContainer } from "react-bootstrap";

// Import components
import Header from "./components/Header.jsx";
import FileUpload from "./components/FileUpload.jsx";
import ProcessingTasks from "./components/ProcessingTasks.jsx";
import ReportsList from "./components/ReportsList.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import SectionNavigator from "./components/SectionNavigator.jsx";

// Import services and utils
import ApiService from "./services/api.jsx";
import { downloadBlob } from "./utils/fileUtils.jsx";

// 樣式已經在 index.js 中統一載入，這裡不需要重複導入

const App = () => {
	const [uploadStatus, setUploadStatus] = useState("");
	const [processingTasks, setProcessingTasks] = useState([]);
	const [reports, setReports] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [isLoadingReports, setIsLoadingReports] = useState(true);
	const [toast, setToast] = useState({
		show: false,
		message: "",
		variant: "success",
	});

	// 載入已有的報表
	useEffect(() => {
		loadReports();
	}, []);

	const showToast = (message, variant = "success") => {
		setToast({ show: true, message, variant });
	};

	const loadReports = async () => {
		try {
			setIsLoadingReports(true);
			const response = await ApiService.getReports();
			setReports(response.data.reports);
		} catch (error) {
			console.error("載入報表失敗:", error);
			showToast("載入報表失敗: " + error.message, "danger");
		} finally {
			setIsLoadingReports(false);
		}
	};

	const handleUpload = async (file) => {
		if (!file) {
			setUploadStatus("請先選擇檔案");
			return;
		}

		try {
			setIsUploading(true);
			setUploadStatus("上傳中...");

			const response = await ApiService.uploadFile(file);

			if (response.data.success) {
				const taskId = response.data.taskId;
				setUploadStatus(`上傳成功！任務 ID: ${taskId}`);

				// 加入處理任務列表
				const newTask = {
					taskId: taskId,
					originalName: response.data.originalName,
					recordCount: response.data.recordCount,
					status: "processing",
					progress: 0,
					message: "處理中...",
				};

				setProcessingTasks((prev) => [...prev, newTask]);

				// 開始輪詢狀態
				pollTaskStatus(taskId);

				showToast("檔案上傳成功，開始處理中...", "success");
			}
		} catch (error) {
			const errorMessage = error.message || "檔案上傳失敗";
			setUploadStatus("上傳失敗: " + errorMessage);
			showToast("上傳失敗: " + errorMessage, "danger");
		} finally {
			setIsUploading(false);
		}
	};

	const pollTaskStatus = async (taskId) => {
		const maxPolls = 30; // 最多輪詢 30 次
		let pollCount = 0;

		const poll = async () => {
			try {
				const response = await ApiService.getProcessStatus(taskId);
				const statusData = response.data;

				// 更新任務狀態
				setProcessingTasks((prev) =>
					prev.map((task) =>
						task.taskId === taskId ? { ...task, ...statusData } : task
					)
				);

				if (statusData.status === "completed") {
					// 處理完成，重新載入報表列表
					showToast("檔案處理完成！", "success");
					loadReports();
					return;
				}

				if (statusData.status === "error") {
					showToast(`任務 ${taskId} 處理失敗: ${statusData.message}`, "danger");
					return;
				}

				// 如果還在處理中，繼續輪詢
				if (statusData.status === "processing" && pollCount < maxPolls) {
					pollCount++;
					setTimeout(poll, 2000); // 每 2 秒輪詢一次
				}
			} catch (error) {
				console.error("輪詢狀態失敗:", error);
			}
		};

		poll();
	};

	const handleDownload = async (taskId) => {
		try {
			const response = await ApiService.downloadFile(taskId);
			downloadBlob(response.data, `processed_${taskId}.xlsx`);
			showToast("檔案下載成功！", "success");
		} catch (error) {
			const errorMessage = error.message || "下載失敗";
			showToast("下載失敗: " + errorMessage, "danger");
		}
	};

	return (
		<div className='App'>
			<Header />

			<Container className='py-5'>
				{/* 報表整合工具標題區塊 */}
				<div
					className='tool-header-section mb-4'
					style={{ backgroundColor: "#fff" }}>
					<div className='text-center py-4'>
						<h1 className='display-5 fw-bold text-dark mb-3 fs-2'>
							<i className='bi bi-gear-wide-connected me-3 text-primary'></i>
							報表整合工具
						</h1>
						<p className='lead text-muted mb-0'>
							財務報表處理平台，支援多格式文件上傳與自動化數據整合
						</p>
					</div>
				</div>

				<div id='upload-section'>
					<FileUpload
						onUpload={handleUpload}
						uploadStatus={uploadStatus}
						isUploading={isUploading}
					/>
				</div>

				<div id='processing-section'>
					<ProcessingTasks
						tasks={processingTasks}
						onDownload={handleDownload}
					/>
				</div>

				<div id='reports-section'>
					<ReportsList
						reports={reports}
						onDownload={handleDownload}
						isLoading={isLoadingReports}
					/>
				</div>
			</Container>

			{/* 區塊導航器 */}
			<SectionNavigator />

			{/* Toast 通知 */}
			<ToastContainer position='top-end' className='p-3'>
				<Toast
					show={toast.show}
					onClose={() => setToast({ ...toast, show: false })}
					delay={4000}
					autohide
					bg={toast.variant}>
					<Toast.Header>
						<i
							className={`bi ${
								toast.variant === "success"
									? "bi-check-circle"
									: "bi-exclamation-triangle"
							} me-2`}></i>
						<strong className='me-auto'>
							{toast.variant === "success" ? "成功" : "錯誤"}
						</strong>
					</Toast.Header>
					<Toast.Body className='text-white'>{toast.message}</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
};

export default App;
