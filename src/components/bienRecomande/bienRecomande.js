import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addFavoriteAnnoncement } from "../../Redux/userActions";
import ImageSlider from 'ac-react-simple-image-slider';


 var ExampleSlider  = (props) => (
  <ImageSlider height='260px' width='550px' data={props.imageData} />
);
class BienRecommande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images:[]
    };
  }
  onAddToFavoriteClick = () => {
    if (!this.props.user._id)
      return alert(
        "Please to log in to add this annoncement to your favorites annoncements"
      );
    if (this.verifyAnnoncementOwner()) {
      alert(
        "Your are the owner of these annoncement, you cant added it to your favorites annoncements"
      );
      return;
    } else if (this.verifyIsAnnoncementAlreadyInFavorites()) {
      alert(
        "These annoncement is already selected in your favorites annoncements"
      );
      return;
    } else this.props.addFavoriteAnnoncement(this.props.item._id);
  };

  verifyAnnoncementOwner = () => {
    if (!this.props.user._id) return false;
    if (this.props.item.userId == this.props.user._id) return true;
    else return false;
  };

  verifyIsAnnoncementAlreadyInFavorites = () => {
    if (
      this.props.user.favoris.filter(el => el == this.props.item._id).length > 0
    )
      return true;
    else return false;
  };

  render() {
    const { item } = this.props;
    const {images} = this.state
  console.log("item :",item)
    var oldimages = []
    item.files.forEach(element => {
        oldimages.push({src:`http://localhost:8080/uploads/${element.filename}`,title:''});
    });

    return (
          <div className="item feature_item">
            <div className="image">
              {" "}
             
            
            <ExampleSlider  imageData={oldimages}/>
            <Link to={`/detail-annonce/${item._id}`}> 
            </Link>
          </div>

            
          <div className="price default_clr clearfix bottom20">
            <span className="tag pull-left"><Link to={`/detail-annonce/${item._id}`}>{item.statut}</Link></span>
            <h4 className="pull-right">
              {item.prix}
            </h4>
          </div>
            <div className="proerty_content">
              <div className="proerty_text">
                <h3 className="bottom15">
                 <Link to={`/detail-annonce/${item._id}`}> {item.titre} </Link>
                </h3>
                <p>{item.parag}</p>
                <a href="property_detail1.html" className="btn-more">
                  <i>
                    <img src="images/arrowl.png" alt="arrow" />
                  </i>
                  <span>More Details</span>
                  <i>
                    <img src="images/arrowr.png" alt="arrow" />
                  </i>
                </a>
              </div>
              <div className="property_meta">
                {" "}
                <span>
                  <i className="icon-select-an-objecto-tool" />
                  {item.surface}
                </span>{" "}
                <span>
                  <i className="icon-bed" />
                  {item.chambre}
                </span>{" "}
                <span>
                  <i className="icon-safety-shower" />
                  {item.salleDeBain}
                </span>{" "}
              </div>
            </div>
          </div>
       
     
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { addFavoriteAnnoncement }
) (BienRecommande);
