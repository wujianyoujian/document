# API

## Cesium

### Cesium.Viewer
> 构建一个地球
```javascript
new Cesium.Viewer("cesiumContainer", {

})
```

#### option
?> 上面构建地球配置参数

* `BaseLayerPicker`
> 图层选择控件

* `imageryProviderViewModels`
> 地球底图

> 接受一个`new Cesium.ProviderViewModel（视图模型）`的数组对象

```javascript
imgModel = new Cesium.ProviderViewModel({
    name: '百度电子',
    tooltip: '百度电子地图服务',
    iconUrl: "img/basemaps/gaode_vec.png",
    creationFunction: function () {
        return das3d.layer.createImageryProvider({ type: "www_baidu", layer: "vec" });
    }
});
```

* `terrainProviderViewModels`
> 地球地形
> 只有当`BaseLayerPicker为true的时候才有效

#### Viewer.scene : Scene
> 场景
> 虚拟场景中所有3d图形对象和状态的容器

##### Viewer.scene.SpaceCameraController.tiltEventTypes
> 场景里面的一些事件

##### Viewer.scene.camera : Camera
> 场景里面的相机

#### Viewer.camera : Camera
> 相机

##### Method
* `flyTo`
> 将相机从当前位置移动到新位置


#### Viewer.clock : Clock
> 时钟

#### Method
##### 模拟时钟进行的每次回调函数

#### Viewer.imageryLayers
> 获取将在地图上渲染的图像图层的集合

* 设置图层的属性, 如亮度
`viewer.imageryLayers.get(0)['brightness'] = 10`

#### viewer.entities : Entities
> 实体集
##### 添加实体
* 添加点
```javascript
viewr.entities.add({
    name: String,
    // 位置
    poistion: 
    // 类型为点
    point: {
        // 颜色
        color
        // 像素大小
        pixelSize
        // 相对于高度的高度
        heightReference
    }

})
```
* 添加文字
```javascript
viewer.entities.add({
    name: '..',
    position: ,
    label: {
        // 文字
        text: 
    }
})
```

* 广告牌
```javascript
viewer.entities.add({
    name: "贴地图标",
    position: Cesium.Cartesian3.fromDegrees(116.39224, 30.902853),
    billboard: {
        image: 'img/marker/mark2.png',
        scale: 1,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
});

```

* 添加线， 虚线和实线只是材质不一样
```javascript
var glowingLine = viewer.entities.add({
    name: 'Glowing blue line on the surface',
    polyline: {
        // 没有高度， 默认在同一高度下
        positions: Cesium.Cartesian3.fromDegreesArray([110, 27, 130, 27]),
        width: 10,
        material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.BLUE
        })
    }
});

```

* 添加一个点到另一个点的曲线
> 就是计算出两个点之间的很多的点，在设置曲率，点集
```javascript
entities.add({
    name: '箭头动态特效 空中',
    polyline: {
        positions: positions,
        width: 5,
        material: new das3d.LineFlowMaterial({//动画线材质
            color: new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
            duration: 2000, //时长，控制速度
            url: 'img/textures/arrow_1.png'
        }),
    }
})
```


* 平面
```javascript
var bluePlane = viewer.entities.add({
    name: 'Blue plane',
    position: Cesium.Cartesian3.fromDegrees(114.0, 30.0, 300000.0),
    plane: {
        // 指定法线和距离
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
        // 宽度和高度
        dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
        material: Cesium.Color.BLUE
    }
});
```

### Cesium.Cartesian3
> 3d笛卡尔点

### das3d
[API](http://das-earth-website.obs.cn-east-2.myhuaweicloud.com/das3DMap/api.html#TerrainLayer)
[例子](http://das-earth-website.obs.cn-east-2.myhuaweicloud.com/das3DMap/index.html#baselayer)
> 基于cesium封装的框架

### Cesium.PrimitiveCollection
> 原始体集合

#### 添加实体
> 与viewer.entities中添加实体类似, 不过添加得是原始实体集合
```javascript
viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection())
```

### Cesium.Model
> 基于gltf的3d模型

#### das3d.ViewerEx
> 扩展, 控件
```javascript
viewer.das = new das3d.ViewerEx(viewer, {
    contextmenu: true,
    // 可以设置动画最后结束的位置
    center: { "y": 20.758452, "x": 108.198353, "z": 7733735.96, "heading": 357.7, "pitch": -82.4, "roll": 0.9 },
    mouseZoom: true,
    // 夸张系数
    terrainExaggeration: 3
    location: {
        format: "<div>视高：{height}米</div><div>方向：{heading}度</div><div>海拔：{z}米</div><div>纬度:{y}</div><div>经度:{x}</div>"
    },
    navigation: {
        compass: { top: "5px", left: "5px" }
    },
});
```

#### das3d.createMap
> 创建地图
```javascript
das3d.createMap({
    id: 'cesiumContainer',
    url: configfile,
    success: function (_viewer, jsondata) {

    }
})
```

#### viewer.das.*
> 一些静态方法
##### viewer.das.centerAt
> 地图定位到指定区域
```
视高：{height}
方向：{heading}
度
海拔：{z}米
经度:{x}
纬度:{y}
```

#### das3d.layer
> 图层, 创建图层和图层相关的处理类

##### das3d.layer.createLayer
> 创建图层

* 创建3d模型并且显示出来
```javascript
das3d.layer.createLayer({
    // 创建图层的类型
    "type": "3dtiles",
    // 数据
    "url": "http://data.marsgis.cn/3dtiles/qx-simiao/tileset.json",
    // 偏移
    "offset": { "z": 80 },
    // 可见
    "visible": true
}, viewer)
```

* 创建底图
```javascript
// 先使用das3d基础类的方法进行创建
das3d.layer.createLayer({
    "type": "tile",
    ...
})
// 再使用cesium的构造方法转换成imageryLayer
let imagelayer = new Cesium.ImageryLayer(imageryProvider, {})
viewer.imageryLayers.add(imagelayer)
```

#### das3d.Draw
> 实体类, 标绘控制处理类， 文字，点，线，面，立体，模型，等entity对象的绘制
```javascript
function drawPoint() {
viewer.das.draw.deleteAll();

viewer.das.draw.startDraw({
    type: "point",
    style: {
        pixelSize: 12,
        color: '#ffff00'
    },
    success: function (entity) {
        // 点击之后删除绘制的, 获取位置信息, 再在这个位置创建一个DIVPoint
        var position = entity.position.getValue();
        viewer.das.draw.deleteAll();

        var divpoint = new das3d.DivPoint(viewer, {
            html: `<div class="divpoint2">
                <div class="title">测试DIV点</div>
                <div class="content">此处可以绑定任意Html代码和css效果</div> 
            </div >`,
            position: position,
            anchor: [0, 0],
            click: function (e) {//单击后的回调
                haoutil.msg('单击了点');

            },
        });
        arrPoint.push(divpoint);
    }
});
}
```

#### das3d.draw.attr.model
> das3d.draw.attr.model 该类是静态类。用于model entity相关属性处理。
##### 使用das3d.draw中的方法获取实体的位置加上高度的影响
```javascript
let positions = das3d.draw.attr.polygon.getPositions(entity)
let ptcenter = das3d.point.centerOfMass(positions, height)
```


#### das3d.DivPoint
> 用于自定义动态效果的点对象展示,
```javascript
var divpoint = new das3d.DivPoint(viewer, {
    html: "任意html",
    position: Cesium.Cartesian3.fromDegrees(118.810112, 31.231319),
    anchor: [0, 0],
    data: item, //item为需要绑定的数据
    click: function (e) {//单击后的回调 
    }
});
```

#### das3d.*
> 里面有很多材质属性


### 随机数
> haoutil.math

### 导出文件
> 使用haoutil库
```javascript
haoutil.file.downloadImage('地图', viewer.canvas)
```

### 请求文件
> 请求配置文件
```javascript
haoutil.system.getRequstByName("config", "config/config.json")
```
### `knockout`
> `knockout`, 现实像vue一样的数据绑定的功能
i
### 一些常用的用法
#### 地图上的图标点与文字
(图标和文字)[http://das-earth-website.obs.cn-east-2.myhuaweicloud.com/das3DMap/cesium-example/editor.html#22_point_billboard]

### 数据格式
* 矢量数据
GeoJson
> 对数据结果进行编码的格式, 支持点，线，面，多点，多线，多面，几何体
KML
CZML

### 添加模型的几种方法

* `heading`: 水平方向 左右旋转
* `pitch`: 垂直方向 前后上下旋转
* `roll`: 垂直方向 左右上下旋转

> 其中`position`的属性是Cartesian3, 需要的是一个笛卡尔点对象
```JavaScript 
// 1
das3d.layer.createLayer({
    "type": "3dtiles",
    "name": "整体模型",
    "url": "http://data.marsgis.cn/3dtiles/max-fsdzm/tileset.json",
    "offset": { "z": 3 },
    // 相机的位置
    center:
    "visible": true
}, viewer);

// 2
das3d.util.createModel({
    uri: '../data/gltf/shanghai/scene.gltf',
    x: 121.507762,
    y: 31.233975,
    z: 200,
    scale: 520,
    heading: 215,
}, viewer);

// 3
viewer.entities.add({
    position: position,
    orientation: Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll)),
    model: {
        uri: '../data/gltf/weixin.gltf',
        scale: 1,
        minimumPixelSize: 150
    },
});
// 4
var origin = Cesium.Cartesian3.fromDegrees(113.693, 31.243, 220000);
var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(origin, new Cesium.HeadingPitchRoll());

var modelUrl = '../data/gltf/launchvehicle.glb';
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url: modelUrl,
    modelMatrix: modelMatrix,
    minimumPixelSize: 128
}));
```


### 定位相机的位置
> viewer.camera.position  
> viewer.camera.direction  
> viewer.camera.up  
> 通过这三个值来确定 （flyTo)

### 加载各种类型的数据

> GeoJsonDataSource 可以处理GeoJSON和TopJSON

```javascript
viewer.dataSource.add(Cesium.GeoJsonDataSource.load('*.geojson', {}))
viewer.zoomTo(datasource)

# .load方法返回一个promise对象
```

> 3dtileset 

```javascript
let tileset = scene.primitives.add(new Cesium.Cesium3DTileset({
    url: ''
}))
```

#### 加载3dtiles数据
##### OSGB装换为3dtiles
> 使用`cesiumlab`工具进行转换
> 转换后加载`tileset.json`文件就可以了
```javascript
var palaceTileset = new Cesium.Cesium3DTileset({
    url: '../3dtiles/tileset.json'
});
viewer.scene.primitives.add(palaceTileset);
viewer.flyTo(palaceTileset);
```


