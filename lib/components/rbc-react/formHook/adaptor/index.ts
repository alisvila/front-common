import { useFormContext } from "react-hook-form";

export function hookFormAdaptor() {
  this.useFormContext = useFormContext
  this.setStart = function () {
    
  };
  this.setDestination = function () {
    
  };
  this.calculate = function () {
    return "$39.50";
  };
}


export function formikAdaptor() {
    this.login = function () {
      
    };
    this.setStart = function () {
      
    };
    this.setDestination = function () {
      
    };
    this.calculate = function () {
      return "$39.50";
    };
  }
  
  