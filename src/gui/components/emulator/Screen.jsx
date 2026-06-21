import React, { Component } from "react";
import classNames from "classnames";
import { getActiveScreenSize } from "../../screen";
import styles from "./Screen.module.css";

export default class Screen extends Component {
	render() {
		const { className } = this.props;
		const { width, height } = getActiveScreenSize();

		return (
			<canvas
				id="screen"
				className={classNames(styles.screen, className)}
				width={width}
				height={height}
				onMouseMove={this._onMouseMove}
				onMouseDown={this._onMouseDown}
				onMouseUp={this._onMouseUp}
				onMouseLeave={this._onMouseLeave}
				ref={(canvas) => {
					if (canvas) this._initCanvas(canvas);
				}}
			/>
		);
	}

	setBuffer = (buffer) => {
		this.buf32.set(buffer);
		this.imageData.data.set(this.buf8);
		this.context.putImageData(this.imageData, 0, 0);
	};

	toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			if (this.canvas.requestFullscreen) this.canvas.requestFullscreen();
		} else {
			if (document.exitFullscreen) document.exitFullscreen();
		}
	};

	_onMouseMove = (e) => {
		const position = this._getMousePosition(e);
		if (position != null) this.props.onMouseMove?.(position.x, position.y);
	};

	_onMouseDown = (e) => {
		if (this._getMousePosition(e) != null) this.props.onMouseDown?.(e.button);
	};

	_onMouseUp = (e) => {
		if (this._getMousePosition(e) != null) this.props.onMouseUp?.(e.button);
	};

	_onMouseLeave = () => {
		if (!this._isMouseInside) return;

		this._isMouseInside = false;
		this.props.onMouseLeave?.();
	};

	_getMousePosition(e) {
		const rect = this.canvas.getBoundingClientRect();
		const scale = Math.min(
			rect.width / this.canvas.width,
			rect.height / this.canvas.height
		);
		const width = this.canvas.width * scale;
		const height = this.canvas.height * scale;
		const x = e.clientX - rect.left - (rect.width - width) / 2;
		const y = e.clientY - rect.top - (rect.height - height) / 2;

		if (x < 0 || x > width || y < 0 || y > height) {
			this._onMouseLeave();
			return null;
		}

		this._isMouseInside = true;
		return { x: x / scale, y: y / scale };
	}

	_initCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		const { width, height } = getActiveScreenSize();
		this.imageData = this.context.getImageData(0, 0, width, height);

		// set alpha to opaque
		this.context.fillStyle = "black";
		this.context.fillRect(0, 0, width, height);

		// buffer to write on next animation frame
		this.buf = new ArrayBuffer(this.imageData.data.length);

		// get the canvas buffer in 8bit and 32bit
		this.buf8 = new Uint8ClampedArray(this.buf);
		this.buf32 = new Uint32Array(this.buf);
	}
}
